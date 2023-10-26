function generateUserID(shopName: string, phone: string): string {
  const cleanedShopName = shopName.replace(/\s+/g, "").toLowerCase();
  const cleanedPhone = phone.replace(/\s+/g, "").toLowerCase();
  const userName = `${cleanedShopName}${cleanedPhone}`;
  return userName;
}

export { generateUserID };
