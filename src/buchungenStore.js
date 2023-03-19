import { atom } from "nanostores";

// Ganze Familie
export const familyNames = atom("Noch kein Familienname bekannt");
export const shouldKrampusCome = atom(false);
export const terminId = atom(null);
export const adultAmount = atom(null);
export const allChildren = atom([]);

export const editChildMode = atom(null);

export const addChildErrorMessage = atom(null);
export const childInputIsValid = atom(false);

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

export function clearAddChildInputs() {
  setTimeout(() => {
    childName.set(null);
    positives.set(null);
    negatives.set(null);
    zusätzliches.set(null);
    positivesVerbessert.set(null);
    wasHereBefore.set(false);
    birthday.set(null);
    wasHereYear.set(null);
  }, 500);
}

export function validateChildInput(childToValidate) {
  let nameAlreadyTaken = allChildren
    .get()
    .some((storedChild) => storedChild.name === childToValidate.name);

  if (
    editChildMode.get() &&
    editChildMode.get().name === childToValidate.name
  ) {
    nameAlreadyTaken = false;
  }

  if (!childToValidate.name || nameAlreadyTaken) {
    addChildErrorMessage.set("Fehler");
    childInputIsValid.set(false);
  } else {
    childInputIsValid.set(true);
    addChildErrorMessage.set(null);
  }
}

export function removeChild(childToRemove) {
  const alteredArray = allChildren.get();
  alteredArray.splice(
    allChildren.get().findIndex((child) => {
      return child.name === childToRemove.name;
    }),
    1
  );
  allChildren.set([...alteredArray]);
}

export function setActiveChild(childToSet) {
  childName.set(childToSet.name);
  positives.set(childToSet.pos);
  negatives.set(childToSet.neg);
  zusätzliches.set(childToSet.zus);
  positivesVerbessert.set(childToSet.posVer);
}

export function editChild(childToEdit) {
  setActiveChild(
    allChildren.get().find((child) => {
      return child.name === childToEdit.name;
    })
  );
  editChildMode.set(childToEdit);
}

export function addNewChild({
  name,
  pos,
  neg,
  zus,
  posVer,
  wasHere,
  bday,
  whenWasHere,
}) {
  validateChildInput({
    name,
    pos,
    neg,
    zus,
    posVer,
    wasHere,
    bday,
    whenWasHere,
  });
  if (!childInputIsValid.get()) {
    console.log("not valid");
    return;
  }
  // If we're editing a child
  if (editChildMode.get()) {
    removeChild(editChildMode.get());
    allChildren.set([
      ...allChildren.get(),
      { name, pos, neg, zus, posVer, wasHere, bday, whenWasHere },
    ]);
    editChildMode.set(null);
    isAddChildModalOpen.set(false);
    clearAddChildInputs();
  } else {
    // Adding new child entry
    allChildren.set([
      ...allChildren.get(),
      { name, pos, neg, zus, posVer, wasHere, bday, whenWasHere },
    ]);
    isAddChildModalOpen.set(false);
    clearAddChildInputs();
  }
}
