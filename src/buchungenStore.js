import { map, atom } from "nanostores";

// Ganze Familie
export const familyNames = atom("Noch kein Familienname bekannt");
export const shouldKrampusCome = atom(false);
export const terminId = atom(null);
export const adultAmount = atom(null);
export const allChildren = map({});

// Einzelnes Kind
export const isAddChildModalOpen = atom(false);
export const childName = atom("");
export const positives = atom("");
export const negatives = atom("");
export const zusätzliches = atom("");
export const positivesVerbessert = atom("");
export const wasHereBefore = atom(false);
export const birthday = atom("");
export const wasHereYear = atom("");

export function addChild(
  name,
  pos,
  neg,
  zus,
  posVer,
  wasHere,
  bday,
  whenWasHere = "Zum ersten mal bei uns"
) {
  allChildren.setKey(name, {
    name,
    pos,
    neg,
    zus,
    posVer,
    wasHere,
    bday,
    whenWasHere,
  });
}
