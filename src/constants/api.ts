export const BASE_SIZE = "base_size";

export const enum ADDRESS_TYPE {
  WORK = "work",
  HOME = "home",
}

export const enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const GENDER_LIST = [
  { label: "Male", value: GENDER.MALE },
  { label: "Female", value: GENDER.FEMALE },
  { label: "Other", value: GENDER.OTHER },
];

export const ADDRESS_TYPE_LIST = [
  { label: "Home", value: ADDRESS_TYPE.HOME },
  { label: "Work", value: ADDRESS_TYPE.WORK },
];
