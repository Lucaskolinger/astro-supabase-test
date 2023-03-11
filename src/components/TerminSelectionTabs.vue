<template>
  <TabGroup
    @change="onTabChange"
    as="article"
    class="w-full max-w-xl px-2 sm:px-0"
  >
    <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
      <Tab
        v-for="wochentag in wochentage"
        as="template"
        :key="wochentag"
        v-slot="{ selected }"
      >
        <button
          :class="[
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
              ? 'bg-white shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
          ]"
        >
          {{ wochentag }}
        </button>
      </Tab>
    </TabList>

    <TabPanels class="mt-4">
      <TabPanel v-for="wochentag in wochentage" :key="wochentag">
        <RadioGroup v-model="selectedRadio">
          <RadioGroupLabel class="sr-only">Wunschtermin</RadioGroupLabel>
          <div class="h-80 space-y-2 px-4 overflow-y-scroll">
            <RadioGroupOption
              as="template"
              v-for="termin in termine.filter((termin) => {
                return wochentag === generateDayFromDate(termin.datum);
              })"
              :value="termin"
              :disabled="termin.booked ? true : false"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  termin.booked
                    ? 'bg-gray-800 cursor-not-allowed'
                    : 'cursor-pointer',
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : '',
                  checked
                    ? 'bg-sky-900 bg-opacity-75 text-white '
                    : 'bg-white ',
                ]"
                class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
              >
                <div class="flex w-full items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ termin.uhrzeit }}
                      </RadioGroupLabel>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";

type Termin = {
  id: Number;
  datum: String;
  booked: Boolean;
  uhrzeit: String;
  created_at: Date;
};

const props = defineProps<{
  termine: Termin[];
}>();

const selectedRadio = ref(null);

const onTabChange = () => {
  selectedRadio.value = null;
};
const generateDayFromDate = (datum: any) => {
  const dateInt = new Date(datum).getDay();
  switch (dateInt) {
    case 0:
      return "Sonntag";
      break;
    case 1:
      return "Montag";
      break;
    case 2:
      return "Dienstag";
      break;
    case 3:
      return "Mittwoch";
      break;
    case 4:
      return "Donnerstag";
      break;
    case 5:
      return "Freitag";
      break;
    case 6:
      return "Samstag";
      break;
  }
};
const generateWochentage = (termine) => {
  const dayIntsArray = termine.map((termin) => {
    return new Date(termin.datum).getDay();
  });
  const uniqueArray = [...new Set(dayIntsArray)];
  return uniqueArray.map((item) => {
    switch (item) {
      case 0:
        return "Sonntag";
        break;
      case 1:
        return "Montag";
        break;
      case 2:
        return "Dienstag";
        break;
      case 3:
        return "Mittwoch";
        break;
      case 4:
        return "Donnerstag";
        break;
      case 5:
        return "Freitag";
        break;
      case 6:
        return "Samstag";
        break;
    }
  });
};
const wochentage = generateWochentage(props.termine);
</script>
