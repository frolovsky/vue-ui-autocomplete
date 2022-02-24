<template>
  <div
    class="ui-autocomplete"
    v-click-outside="closeItems"
    v-tab-other="closeItems"
  >
    <div class="ui-autocomplete__search" @click="openItems">
      <div class="result-field">
        <ui-input-wrapper :label="label" :id="id" :no-bottom-radius="isOpen">
          <input
            v-if="!multiple || (multiple && !selected.length)"
            v-model.trim="search"
            :placeholder="placeholder"
            :id="id"
            class="result-field__search"
            type="text"
            @focus="openItems"
          />
          <div v-else class="result-field__list">
            <div
              v-for="itemId in selected"
              :key="itemId"
              class="result-field__item"
            >
              <span class="item-text">
                {{ getTextOfItemById(itemId) }}
              </span>
              <icon-close
                class="item-clear"
                @click.native.stop="removeItemFromSelected(itemId)"
              />
            </div>
          </div>
        </ui-input-wrapper>

        <div class="result-field__icon">
          <template
            v-if="
              (!selected || multiple) &&
              autocompleteData &&
              autocompleteData.length
            "
          >
            <slot
              name="drop-icon"
              :is-open="isOpen"
              :toggle-items="toggleItems"
            >
              <div class="drop-icon" @click.stop="toggleItems">
                <div
                  class="triangle-bottom"
                  :class="{ 'triangle-bottom--opened': isOpen }"
                />
              </div>
            </slot>
          </template>
          <template
            v-if="
              ((!multiple && selected) ||
                (multiple && selected && selected.length)) &&
              autocompleteData
            "
          >
            <slot name="clear-icon" :clear="clear">
              <icon-close @click.native="clear" />
            </slot>
          </template>
        </div>
      </div>
    </div>
    <div v-if="autocompleteData && isOpen" class="ui-autocomplete__items">
      <div class="items-wrapper">
        <div v-if="!filteredItems.length" class="item item-no-text">
          <template v-if="selected">
            <slot name="no-text-clear" :clear="clear">
              <span class="item-no-text_clear" @click="clear"
                >Очистить значение</span
              >
            </slot>
          </template>
          <template v-else>
            <slot name="item-no-text">
              <div class="item__content">
                <span class="item__content__text">{{ emptyText }}</span>
              </div>
            </slot>
          </template>
        </div>

        <div
          v-for="item in filteredItems"
          :key="item[itemValueKey]"
          class="item"
          :class="{
            'item--selected': multiple && selected.includes(item[itemValueKey]),
          }"
          @click="selectItem(item)"
        >
          <div class="item__content">
            <span class="item__content__text">
              <template v-if="!highlight || !search">{{
                item[itemTextKey]
              }}</template>
              <template v-else>
                <ui-highlight
                  :text="item[itemTextKey]"
                  :font-weight="700"
                  :highlight="search"
                  :index="item.highlightFrom"
                />
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import generateUID from "@/helpers/generateUID";
import {
  AllowedItemTypes,
  Item,
} from "@/components/ui/ui-autocomplete/ui-autocomplete.types";

const UiHighlight = () =>
  import(
    /* webpackChunkName: "ui-highlight" */ "@/components/ui/ui-highlight/ui-highlight.vue"
  );
const UiInputWrapper = () =>
  import(
    /* webpackChunkName: "ui-input-wrapper" */ "@/components/ui/ui-input-wrapper/ui-input-wrapper.vue"
  );
const IconClose = () =>
  import(
    /* webpackChunkName: "icon-close" */ "@/components/shared/icons/icon-close.vue"
  );

@Component({
  name: "UiAutocomplete",
  components: {
    UiHighlight,
    UiInputWrapper,
    IconClose,
  },
  model: {
    prop: "modelValue",
    event: "select",
  },
})
export default class UiAutocomplete extends Vue {
  @Prop({ type: String, default: "" }) placeholder!: string;
  @Prop({ type: String, default: "" }) label!: string;
  @Prop({ type: String, default: "Совпадений не найдено" }) emptyText!: string;

  @Prop({ type: String, default: "text" }) itemTextKey!: string;
  @Prop({ type: String, default: "id" }) itemValueKey!: string;
  @Prop({ type: Array, default: [] }) items!: Array<Item>;
  @Prop({ type: Array, default: [] }) modelValue!:
    | Array<AllowedItemTypes>
    | Item;

  @Prop({ type: Boolean, default: false }) multiple!: boolean;
  @Prop({ type: Boolean, default: true }) highlight!: boolean;
  @Prop({ type: Boolean, default: false }) alwaysOpen!: boolean;

  search = "";
  id = "";
  autocompleteData: Array<Item> = [];
  selected: Item | Array<AllowedItemTypes> | null = null;
  isOpen = false;

  created(): void {
    this.id = generateUID();
    this.autocompleteData = this.items.slice();
    if (this.multiple) {
      this.selected = this.modelValue as Array<AllowedItemTypes>;
    }
    if (this.alwaysOpen) {
      this.openItems();
    }
  }

  openItems(): void {
    this.isOpen = true;
  }

  closeItems(): void {
    if (!this.alwaysOpen) {
      this.isOpen = false;
    }
  }

  toggleItems(): void {
    this.isOpen = !this.isOpen;
  }

  get filteredItems(): Array<Item> {
    return !this.search
      ? this.autocompleteData
      : this.autocompleteData.filter((item: Item) => {
          const index = (item[this.itemTextKey] as string)
            .toLocaleLowerCase()
            .indexOf(this.search.toLocaleLowerCase());
          if (index !== -1) {
            item.highlightFrom = index;
          }
          return (
            index !== -1 &&
            item[this.itemValueKey] !==
              (this.selected as Item)?.[this.itemValueKey]
          );
        });
  }

  selectItem(item: Item): void {
    if (this.multiple) {
      const value = item[this.itemValueKey];
      if ((this.selected as Array<AllowedItemTypes>).includes(value)) {
        this.removeItemFromSelected(value);
      } else {
        (this.selected as Array<AllowedItemTypes>).push(value);
      }
    } else {
      this.selected = item;
      this.search = String(item[this.itemTextKey]);
      this.isOpen = false;
    }
  }

  removeItemFromSelected(value: AllowedItemTypes): void {
    this.selected = (this.selected as Array<AllowedItemTypes>).filter(
      (i: AllowedItemTypes) => i !== value
    );
  }

  @Watch("selected", { deep: true })
  onUpdateSelected(): void {
    this.$emit("select", this.selected);
  }

  getTextOfItemById(id: AllowedItemTypes): string | undefined {
    return this.items.find((i) => i[this.itemValueKey] === id)?.[
      this.itemTextKey
    ] as string | undefined;
  }

  clear(): void {
    this.selected = this.multiple ? [] : null;
    this.search = "";
  }
}
</script>

<style lang="scss" scoped>
$background-color: #f2f5fb;
$text-color--deep: #334d6e;
$app-radius: 6px;
$table-text: #4f6a92;
$table-hover: #f4f8fc;

.ui-autocomplete {
  .result-field {
    position: relative;
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 24px;
    min-width: 0;
    width: 100%;

    &__search {
      height: 56px;
      display: flex;
      width: 100%;
      font-size: 16px;
      color: #4f6a92;
      padding: 0 14px;

      &:disabled {
        cursor: default;
      }
    }

    &__icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .drop-icon {
        padding: 5px;

        &:hover {
          .triangle-bottom {
            border-top-color: rgba(121, 145, 180, 0.8);
          }
        }
      }

      .triangle-bottom {
        border-width: 7px;
        margin-top: 7px;

        &--opened {
          transform: rotate(180deg);
          top: -6px;
        }
      }

      svg {
        margin-left: 10px;
      }
    }

    &__list {
      padding: 9px 75px 9px 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      padding: 5px 15px 5px 5px;
      border-radius: 10px;
      margin: 5px 0 5px 14px;
      background-color: $background-color;

      .item-clear {
        width: 10px;
        height: 10px;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }

  &__items {
    background-color: #fff;
    box-shadow: none;
    border: none;
    filter: drop-shadow(5px 4px 14px rgba(0, 0, 0, 0.12));
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 $app-radius $app-radius;

    .items-wrapper {
      overflow: auto;
      max-height: 200px;
      scrollbar-width: thin;
      scrollbar-color: #d9e0ee #f2f5fb;

      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      &::-webkit-scrollbar-track {
        background-color: #f2f5fb;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #d9e0ee;
      }
    }

    .item {
      padding: 8px 14px;
      white-space: normal;
      font-size: 14px;
      cursor: pointer;
      color: $table-text;

      &--selected {
        background: $table-hover;
        color: $text-color--deep;
      }

      &:hover {
        background: $table-hover;
        color: $text-color--deep;
      }
    }
  }
}
</style>
