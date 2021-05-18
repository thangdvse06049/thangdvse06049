export const computeAge = (season: any, birthDate: any) => {
  const startDate = new Date(season?.startDate);
  const cvtBirthDate = new Date(birthDate);
  let age = startDate.getFullYear() - cvtBirthDate.getFullYear();
  var m = startDate.getMonth() - cvtBirthDate.getMonth();
  if (m < 0 || (m === 0 && startDate.getDate() < cvtBirthDate.getDate())) {
    age--;
  }
  return age;
};
