export const filterConstant = (() => {
  const SHOW_ACTIVE = "ACTIVE";
  const SHOW_COMPLETED = "COMPLETED";
  const SHOW_ALL = "ALL";
  return {
    SHOW_ACTIVE,
    SHOW_COMPLETED,
    SHOW_ALL,
    all: [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
  };
})();
