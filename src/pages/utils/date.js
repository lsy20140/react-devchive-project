export default function date() {
  const monthDiff = (createdAt) => {
    let months;
    let d1 = new Date(createdAt);
    let d2 = new Date();
  
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  return { monthDiff }
}