<script setup lang="ts">
import { ref } from "vue";
import { wasHereYear } from "../buchungenStore";
import { Icon } from "@iconify/vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const years = [
  { year: "2019" },
  { year: "2020" },
  { year: "2021" },
  { year: "2022" },
];
const selectedYear = ref(years[2]);
wasHereYear.set(selectedYear);
</script>

<template>
  <div class="flex gap-4 mt-4 items-baseline">
    <p>Wann zuletzt?</p>
    <Listbox v-model="selectedYear">
      <div class="relative mt-1 w-32">
        <ListboxButton
          class="relative cursor-default text-gray-400 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedYear.year }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <Icon
              icon="majesticons:chevron-down-circle"
              width="1.25rem"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="year in years"
              :key="year.year"
              :value="year"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ year.year }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <Icon
                    icon="material-symbols:check-small-rounded"
                    aria-hidden="true"
                    width="1.25rem"
                  />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
