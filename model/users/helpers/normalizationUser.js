const normalizeUser = (userData) => {
  if (!userData.image) {
    userData.image = {};
  }
  if (!userData.name) {
    userData.name = {};
  }
  if (!userData.address) {
    userData.address = {};
  }

  userData.image = {
    url:
      userData.image.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: userData.image.alt || "yellow fluffy chickens",
  };

  userData.name = {
    firstName: userData.name.firstName || userData.firstName,
    lastName: userData.name.lastName || userData.lastName,
  };

  delete userData.firstName;
  delete userData.lastName;
  


  userData.address = {
    country: userData.address.country || userData.country,
    city: userData.address.city || userData.city,
    street: userData.address.street || userData.street,
    houseNumber: userData.address.houseNumber || userData.houseNumber,
    state: userData.address.state ||userData.state|| "",
  };
  delete userData.country;
  delete userData.city;
  delete userData.street;
  delete userData.houseNumber;
  delete userData.state;


  return userData;
};

module.exports = normalizeUser;
