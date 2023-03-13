<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { Switch } from "@headlessui/vue";
import { useStore } from "@nanostores/vue";
import { childName } from "@src/buchungenStore";

const $childName = useStore(childName);
const enabled = ref(false);
</script>

<template>
  <div class="flex items-center">
    <p>Ist {{ $childName || "Ihr Kind" }} besonders ängstlich?</p>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-teal-900' : 'bg-gray-200'"
      class="relative ml-4 inline-flex h-[25px] w-[49px] shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only"
        >Ein Schalter, der sagen soll, ob das Kind eher ängstlich ist</span
      >
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-6' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>
