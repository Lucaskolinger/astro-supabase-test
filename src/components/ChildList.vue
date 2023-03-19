<script setup>
import { useStore } from "@nanostores/vue";
import { Icon } from "@iconify/vue";

import { isAddChildModalOpen } from "../buchungenStore";
import { allChildren } from "../buchungenStore";
import { childName } from "../buchungenStore";

import { removeChild } from "../buchungenStore";
import { editChild } from "../buchungenStore";

const $childName = useStore(childName);
const $allChildren = useStore(allChildren);
</script>

<template>
  <ul class="grid grid-cols-3 gap-2" v-if="$allChildren.length > 0">
    <li
      class="bg-gray-200 rounded-2xl p-4 text-white/90"
      v-for="child in $allChildren"
      :key="child.name"
    >
      <div class="flex gap-3 items-center">
        <h3 class="text-gray-900">{{ child.name }}</h3>
        <!-- Edit Btn -->
        <div
          class="cursor-pointer bg-blue-800 p-1 rounded-xl"
          @click="
            () => {
              isAddChildModalOpen.set(true);
              editChild(child);
            }
          "
        >
          <Icon icon="material-symbols:edit" width="1.25rem" />
        </div>
        <!-- Delete Btn -->
        <div
          class="cursor-pointer bg-blue-800 p-1 rounded-xl"
          @click="
            () => {
              removeChild(child);
            }
          "
        >
          <Icon icon="material-symbols:delete-rounded" width="1.25rem" />
        </div>
      </div>
    </li>
  </ul>
  <p v-else>Du hast noch keine Kinder hinzugefügt</p>
</template>
