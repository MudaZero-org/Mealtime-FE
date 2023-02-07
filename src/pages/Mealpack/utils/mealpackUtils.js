import axios from "axios";
import API_URL, { REACT_APP_URL } from "../../../Constants";

//For Icon
import starIcon from "../../../images/star.png";

//For PDF
import { jsPDF } from "jspdf";

//Getting user info
const user = JSON.parse(localStorage.getItem("user"));

const mealpackUtils = {
  fetchUserImageForNav: async (setImage) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.data.storeId;
    const userData = await axios.get(`${API_URL}/user/${userID}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    });
    setImage(userData.data.profileImg);
  },
  //Mealpacks
  // fetchAllMealPacks: async(setMealpacks, setFavoriteMealpacks) => {
  //   const user = JSON.parse(localStorage.getItem("user"))
  // 		const storeId = user.data.storeId
  // 		let all = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
  // 			headers: { authorization: `Bearer ${user.accessToken}` }
  // 		});
  // 		all.data.map((meal) => {meal.selectedFav = false})
  // 		setMealpacks(all.data)

  // 		let favorites = await axios.get(
  // 			`${API_URL}/store/${storeId}/mealpack/all/favorite`,
  // 			{
  // 				headers: { authorization: `Bearer ${user.accessToken}` },
  // 			}
  // 		);
  // 		favorites.data.map((meal) => meal.selectedFav = false)
  // 		setFavoriteMealpacks(favorites.data);
  // },
  fetchNonFavoriteMealpacks: async (setMealpacks) => {
    const storeId = user.data.storeId;
    let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    });
    setMealpacks(data.data);
  },
  fetchFavoriteMealpacks: async (setFavoriteMealpacks) => {
    const storeId = user.data.storeId;
    let data = await axios.get(
      `${API_URL}/store/${storeId}/mealpack/all/favorite`,
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    );
    setFavoriteMealpacks(data.data);
  },
  addMealpackToFavorites: async (meal, setFavoriteMealpacks) => {
    const storeId = user.data.storeId;
    await axios.put(
      `${API_URL}/store/${storeId}/mealpack/${meal.id}`,
      {
        isFavorite: true,
        mealpackName: meal.mealpackName,
        isDelete: false,
      },
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    );
    let data = await axios.get(
      `${API_URL}/store/${storeId}/mealpack/all/favorite`,
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    );
    setFavoriteMealpacks(data.data);
  },
  removeMealpackFromFavorites: async (meal, setMealpacks) => {
    const storeId = user.data.storeId;
    await axios.put(
      `${API_URL}/store/${storeId}/mealpack/${meal.id}`,
      {
        isFavorite: false,
        mealpackName: meal.mealpackName,
        isDelete: false,
      },
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    );
    let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    });
    setMealpacks(data.data);
  },
  deleteMealpack: async (meal, setMealpacks) => {
    const storeId = user.data.storeId;
    //route
    await axios.put(
      `${API_URL}/store/${storeId}/mealpack/${meal.id}`,
      {
        isFavorite: false,
        mealpackName: meal.mealpackName,
        isDelete: true,
      },
      {
        headers: { authorization: `Bearer ${user.accessToken}` },
      }
    );
    let data = await axios.get(`${API_URL}/store/${storeId}/mealpack/all`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    });
    setMealpacks(data.data);
  },
  addToSelectedArr: (meal, selectionArr, setSelectionArr) => {
    if (meal.selectedFav) {
      const arr = [...selectionArr];
      arr.splice(arr.indexOf(meal), 1);
      setSelectionArr(arr);
      meal.selectedFav = false;
    } else {
      const arr = [...selectionArr];
      arr.push(meal);
      setSelectionArr(arr);
      meal.selectedFav = true;
    }
  },
  renderInput: (meal, selectionArr, setSelectionArr) => {
    if (meal.selectedFav) {
      return (
        <input
          checked
          className="checkbox"
          type="checkbox"
          onChange={() =>
            mealpackUtils.addToSelectedArr(meal, selectionArr, setSelectionArr)
          }
        ></input>
      );
    } else {
      return (
        <input
          className="checkbox"
          type="checkbox"
          onChange={() =>
            mealpackUtils.addToSelectedArr(meal, selectionArr, setSelectionArr)
          }
        ></input>
      );
    }
  },
  favoriteIcon: (meal) => {
    if (meal.isFavorite) {
      return (
        <span className="icon">
          <img src={starIcon} className="star-icon" />
        </span>
      );
    }
  },
  favoriteIcon2: (meal) => {
    return (
      <span className="icon">
        <img src={starIcon} className="star-icon" />
      </span>
    );
  },

  filterNutritionPDF: (meal) => {
    console.log(meal);
    let filterArr = [];
    console.log(meal.recipeDetail.vegan);
    meal.recipeDetail.vegan && filterArr.push("Vegan");
    meal.recipeDetail.vegetarian && filterArr.push("Vegetarian");
    meal.recipeDetail.glutenFree && filterArr.push("Gluten Free");
    meal.recipeDetail.dairyFree && filterArr.push("Dairy Free");
    return filterArr;
  },

  downloadPDF: (meal, selectionArr) => {
    let qrCode = mealpackUtils.generateQRCode(meal);
    let nutritionArr = mealpackUtils.filterNutritionPDF(meal);
    const doc = new jsPDF("p", "mm", "a4");
    let width = doc.internal.pageSize.getWidth();
    const name = meal.mealpackName;
    const instructions = meal.recipeDetail.analyzedInstructions[0].steps.map(
      (e) => " " + e.number + "." + " " + e.step
    );
    const nutrition = nutritionArr.map((e) => " " + e);
    const ingredients = meal.recipeDetail.extendedIngredients.map(
      (e) => " " + e.name
    );
    doc.setFontSize(32);
    doc.text(10, 85, `${name}`, {
      maxWidth: width / 1.15,
    });
    doc.setFontSize(14);
    doc.text(10, 95, [`${nutrition}`]);
    doc.setFontSize(18);
    doc.text(10, 110, [`Ingredients: ${ingredients}`], {
      maxWidth: width / 1.15,
    });
    doc.text(10, 140, [`${instructions}`], {
      maxWidth: width / 1.15,
    });
    doc.addImage(meal.recipeDetail.image, "JPG", 20, 15, 80, 50);
    doc.addImage(qrCode, "PNG", 130, 15, 50, 50);
    doc.autoPrint({ variant: "non-conform" });
    doc.save("print-mealpacks.pdf");
  },

  downloadAllPDF: (selectionArr) => {
    const doc = new jsPDF("p", "mm", "a4");
    let width = doc.internal.pageSize.getWidth();
    selectionArr.map((meal) => {
      let qrCode = mealpackUtils.generateQRCode(meal);
      let nutritionArr = mealpackUtils.filterNutritionPDF(meal);
      let name = meal.mealpackName;
      let instructions = meal.recipeDetail.analyzedInstructions[0].steps.map(
        (e) => " " + e.number + "." + " " + e.step
      );
      let ingredients = meal.recipeDetail.extendedIngredients.map(
        (e) => " " + e.name
      );
      let nutrition = nutritionArr.map((e) => " " + e);
      doc.setFontSize(32);
      doc.text(10, 85, `${name}`, {
        maxWidth: width / 1.15,
      });
      doc.setFontSize(14);
      doc.text(10, 95, [`${nutrition}`]);
      doc.setFontSize(18);
      doc.text(10, 110, [`Ingredients: ${ingredients}`], {
        maxWidth: width / 1.15,
      });
      doc.text(10, 140, [`${instructions}`], {
        maxWidth: width / 1.15,
      });
      doc.addImage(meal.recipeDetail.image, "JPG", 20, 15, 80, 50);
      doc.addImage(qrCode, "PNG", 130, 15, 50, 50);
      doc.addPage();
    });
    let pageCount = doc.internal.getNumberOfPages();
    doc.deletePage(pageCount);
    doc.save("print-mealpacks.pdf");
  },
  generateQRCode: (meal) => {
    const QRCode = require("qrcode");
    let qrCodeDataUrl;
    let recipeId = meal.recipeId;
    QRCode.toDataURL(`${REACT_APP_URL}/info/${recipeId}`, function (err, url) {
      qrCodeDataUrl = url;
    });
    return qrCodeDataUrl;
  },
};

export default mealpackUtils;
