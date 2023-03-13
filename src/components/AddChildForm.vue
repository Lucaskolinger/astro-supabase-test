<script setup>
import { ref } from "vue";
import WarSchonmalBeiUns from "@components/WarSchonmalBeiUns.vue";
import IsChildAfraid from "@components/IsChildAfraid.vue";
import { Icon } from "@iconify/vue";
import { useStore } from "@nanostores/vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";

import { isAddChildModalOpen } from "../buchungenStore";
import { childName } from "../buchungenStore";
import { positives } from "../buchungenStore";
import { negatives } from "../buchungenStore";
import { zusätzliches } from "../buchungenStore";
import { wasHereBefore } from "../buchungenStore";
import { wasHereYear } from "../buchungenStore";
import { birthday } from "../buchungenStore";
import { positivesVerbessert } from "../buchungenStore";
import { addChild } from "../buchungenStore";
import { allChildren } from "../buchungenStore";

const $isAddChildModalOpen = useStore(isAddChildModalOpen);

const $childName = useStore(childName);
const $positives = useStore(positives);
const $negatives = useStore(negatives);
const $zusätzliches = useStore(zusätzliches);
const $positivesVerbessert = useStore(positivesVerbessert);
const $wasHereBefore = useStore(wasHereBefore);
const $birthday = useStore(birthday);
const $wasHereYear = useStore(wasHereYear);
const $allChildren = useStore(allChildren);

const enabled = ref(false);
</script>

<template>
  <button
    type="button"
    class="w-max mb-64 mt-8 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    @click="() => isAddChildModalOpen.set(!$isAddChildModalOpen)"
  >
    <div class="flex gap-2 items-center">
      <Icon icon="material-symbols:add-box" width="1.5rem" />
      <p v-if="$childName">Mehr Infos zu {{ $childName }} hinzufügen</p>
      <p v-else>Kind hinzufügen</p>
    </div>
  </button>
  <TransitionRoot appear :show="$isAddChildModalOpen" as="template">
    <Dialog
      as="div"
      @close="
        () => {
          isAddChildModalOpen.set(false);
        }
      "
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center pt-8 pb-16 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl transform overflow-hidden flex flex-col rounded-2xl bg-white px-8 pt-5 pb-12 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle>
                <div class="flex justify-between mb-6 items-baseline">
                  <input
                    type="text"
                    :value="$childName"
                    @input="
                      (e) => {
                        childName.set(e.target.value);
                      }
                    "
                    placeholder="Name Ihres Kindes"
                    class="text-lg font-medium leading-6 text-gray-900 p-2 rounded-xl focus:outline-none focus:ring-2 ring-red-400"
                  />
                  <label class="text-gray-400 text-lg"
                    >Geburtstag
                    <input
                      type="date"
                      :value="$birthday"
                      @input="
                        (e) => {
                          birthday.set(e.target.value);
                        }
                      "
                      max="2023-12-12"
                      class="w-max p-2 text-base text-gray-900 rounded-lg focus:outline-none focus:ring-2 ring-red-400 mb-4 ml-1"
                    />
                  </label>
                  <IsChildAfraid />
                </div>
              </DialogTitle>

              <div class="grid gap-4 grid-cols-2">
                <textarea
                  name="positives"
                  :value="$positives"
                  @input="
                    (e) => {
                      positives.set(e.target.value);
                    }
                  "
                  :placeholder="
                    'Was hat ' +
                    ($childName || 'Ihr Kind') +
                    ' dieses Jahr besonders vorbildlich gemacht?'
                  "
                  rows="10"
                  class="w-full bg-green-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
                <textarea
                  name="negatives"
                  :value="$negatives"
                  @input="
                    (e) => {
                      negatives.set(e.target.value);
                    }
                  "
                  :placeholder="
                    'Was sollte ' +
                    ($childName || 'Ihr Kind') +
                    ' bis zum nächsten Jahr noch verbessern? (optional)'
                  "
                  rows="10"
                  class="w-full bg-red-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
                <textarea
                  name="positivesVerbessert"
                  :value="$positivesVerbessert"
                  @input="
                    (e) => {
                      positivesVerbessert.set(e.target.value);
                    }
                  "
                  :placeholder="
                    'Was hat ' +
                    ($childName || 'Ihr Kind') +
                    ' besonders im Vergleich zum letzten Jahr verbessert? (optional)'
                  "
                  rows="5"
                  w
                  class="w-full bg-yellow-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
                <textarea
                  name="zusätzliches"
                  :value="$zusätzliches"
                  @input="
                    (e) => {
                      zusätzliches.set(e.target.value);
                    }
                  "
                  placeholder="Zusätzliche Anmerkungen und Infos hinzufügen (optional)"
                  rows="5"
                  class="w-full bg-yellow-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                ></textarea>
                <div>
                  <div class="flex">
                    <p>
                      War {{ $childName || "Ihr Kind" }} schon einmal bei uns?
                    </p>
                    <Switch
                      v-model="enabled"
                      :class="enabled ? 'bg-teal-900' : 'bg-gray-200'"
                      class="relative ml-4 inline-flex h-[25px] w-[49px] shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <span class="sr-only"
                        >Entscheiden, ob das Kind schonmal bei uns war</span
                      >
                      <span
                        aria-hidden="true"
                        :class="enabled ? 'translate-x-6' : 'translate-x-0'"
                        class="pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                      />
                    </Switch>
                  </div>
                  <WarSchonmalBeiUns v-if="enabled" />
                  <p v-else>
                    Wir freuen uns, {{ $childName || "Ihr Kind" }} bald zum
                    ersten mal beim Haus des Nikolaus begrüßen zu dürfen!
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="w-max mt-8 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="
                  () => {
                    isAddChildModalOpen.set(false);
                    if (enabled) {
                      wasHereBefore.set(true);
                    }
                    addChild(
                      $childName,
                      $positives,
                      $negatives,
                      $zusätzliches,
                      $positivesVerbessert,
                      $wasHereBefore,
                      $birthday,
                      $wasHereYear
                    );
                    childName.set(null);
                    positives.set(null);
                    negatives.set(null);
                    zusätzliches.set(null);
                    positivesVerbessert.set(null);
                    wasHereBefore.set(false);
                    birthday.set(null);
                    wasHereYear.set(null);
                    setTimeout(() => {
                      enabled = false;
                    }, 1000);
                  }
                "
              >
                <div class="flex gap-2 items-center">
                  <Icon icon="material-symbols:add-box" width="1.5rem" />

                  <p>{{ $childName || "Kind" }} hinzufügen fuck</p>
                </div>
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
