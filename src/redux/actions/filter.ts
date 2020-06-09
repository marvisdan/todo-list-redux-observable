export enum filterActionType {
  VISIBILTY_FILTER = "VISIBILTY_FILTER"
}

export const visibiltyFilter = (filter: unknown) => ({
  type: filterActionType.VISIBILTY_FILTER,
  payload: filter
});
