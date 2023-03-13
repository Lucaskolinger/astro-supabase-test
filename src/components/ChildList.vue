<script setup>
import { useStore } from "@nanostores/vue";
import { Icon } from "@iconify/vue";

import { allChildren } from "../buchungenStore";
import { isAddChildModalOpen } from "../buchungenStore";

import { childName } from "../buchungenStore";
import { positives } from "../buchungenStore";
import { negatives } from "../buchungenStore";
import { zusätzliches } from "../buchungenStore";
import { wasHereBefore } from "../buchungenStore";
import { wasHereYear } from "../buchungenStore";
import { birthday } from "../buchungenStore";
import { positivesVerbessert } from "../buchungenStore";

const $childName = useStore(childName);
const $positives = useStore(positives);
const $negatives = useStore(negatives);
const $zusätzliches = useStore(zusätzliches);
const $positivesVerbessert = useStore(positivesVerbessert);
const $wasHereBefore = useStore(wasHereBefore);
const $birthday = useStore(birthday);
const $wasHereYear = useStore(wasHereYear);

const $allChildren = useStore(allChildren);
</script>

<template>
  <ul class="grid grid-cols-3 gap-2" v-if="Object.values($allChildren).length">
    <li
      class="bg-blue-800 rounded-2xl p-4 text-white/90"
      v-for="child in Object.values($allChildren)"
      v-bind:key="child.name"
    >
      <div
        class="cursor-pointer"
        @click="
          () => {
            isAddChildModalOpen.set(true);
            childName.set(child.name);
            positives.set(child.pos);
            negatives.set(child.neg);
            zusätzliches.set(child.zus);
            positivesVerbessert.set(child.posVer);
          }
        "
      >
        <Icon icon="material-symbols:edit" width="1.25rem" />
      </div>
      <h3>{{ child.name }}</h3>
    </li>
  </ul>
  <p v-else>Du hast noch keine Kinder hinzugefügt</p>
</template>
