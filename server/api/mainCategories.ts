export default defineEventHandler(async (event) => {
  return await fetch('http://localhost:1500/get/getMainCategories');
})