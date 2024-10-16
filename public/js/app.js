// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById("cv-form");
const validType = {
  TEXT: "text",
  TEXT_EMP: "text_emp",
  EMAIL: "email",
  DIGIT: "digit",
  PHONENO: "phoneno",
  ANY: "any",
};

// checking if the element is undefined or null
function checkIfUndefined(element) {
  if ((element !== undefined) && (element !== null)) {
    return element, true;
  }else{
    return false;
  }
}


// user inputs elements
let firstnameElem = mainForm.firstname,
  middlenameElem = mainForm.middlename,
  lastnameElem = mainForm.lastname,
  imageElem = mainForm.image,
  designationElem = mainForm.designation,
  addressElem = mainForm.address,
  emailElem = mainForm.email,
  phonenoElem = mainForm.phoneno,
  summaryElem = document.getElementsByClassName("summary_input")[0];
// display elements
let nameDsp = document.getElementById("fullname_dsp"),
  imageDsp = document.getElementById("image_dsp"),
  phonenoDsp = document.getElementById("phoneno_dsp"),
  emailDsp = document.getElementById("email_dsp"),
  addressDsp = document.getElementById("address_dsp"),
  designationDsp = document.getElementById("designation_dsp"),
  summaryDsp = document.getElementById("summary_dsp"),
  projectsDsp = document.getElementById("projects_dsp"),
  achievementsDsp = document.getElementById("achievements_dsp"),
  skillsDsp = document.getElementById("skills_dsp"),
  educationsDsp = document.getElementById("educations_dsp"),
  experiencesDsp = document.getElementById("experiences_dsp");
  languagesDsp = document.getElementById("languages_dsp");


// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
  let elemsAttrsCount = nodeLists.length;
  let elemsDataCount = nodeLists[0].length;
  let tempDataArr = [];

  // first loop deals with the no of repeaters value
  for (let i = 0; i < elemsDataCount; i++) {
    let dataObj = {}; // creating an empty object to fill the data
    // second loop fetches the data for each repeaters value or attributes
    for (let j = 0; j < elemsAttrsCount; j++) {
      // setting the key name for the object and fill it with data
      dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
    }
    tempDataArr.push(dataObj);
  }

  return tempDataArr;
};

const getUserInputs = () => {
  // achivements
  let achievementsTitleElem = document.querySelectorAll(".achieve_title"),
    achievementsDescriptionElem = document.querySelectorAll(
      ".achieve_description"
    );

  // experiences
  let expTitleElem = document.querySelectorAll(".exp_title"),
    expOrganizationElem = document.querySelectorAll(".exp_organization"),
    expLocationElem = document.querySelectorAll(".exp_location"),
    expStartDateElem = document.querySelectorAll(".exp_start_date"),
    expEndDateElem = document.querySelectorAll(".exp_end_date"),
    expDescriptionElem = document.querySelectorAll(".exp_description");
  // education
  let eduSchoolElem = document.querySelectorAll(".edu_school"),
    eduDegreeElem = document.querySelectorAll(".edu_degree"),
    eduCityElem = document.querySelectorAll(".edu_city"),
    eduStartDateElem = document.querySelectorAll(".edu_start_date"),
    eduGraduationDateElem = document.querySelectorAll(".edu_graduation_date"),
    eduDescriptionElem = document.querySelectorAll(".edu_description");

  let projTitleElem = document.querySelectorAll(".proj_title"),
    projLinkElem = document.querySelectorAll(".proj_link"),
    projDescriptionElem = document.querySelectorAll(".proj_description");

  let skillElem = document.querySelectorAll(".skill");
  let languageElem = document.querySelectorAll(".language");

  // event listeners for form validation
  firstnameElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "First Name")
  );
  if (middlenameElem !== undefined) {
    middlenameElem?.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.TEXT_EMP, "Middle Name")
    );
  }

  lastnameElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "Last Name")
  );
  phonenoElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.PHONENO, "Phone Number")
  );
  emailElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.EMAIL, "Email")
  );
  addressElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.ANY, "Address")
  );
  designationElem?.addEventListener("keyup", (e) =>
    validateFormData(e.target, validType.TEXT, "Designation")
  );

  achievementsTitleElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  achievementsDescriptionElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  expTitleElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  expOrganizationElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Organization")
    )
  );
  expLocationElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Location")
    )
  );
  expStartDateElem?.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "End Date")
    )
  );
  expEndDateElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "End Date")
    )
  );
  expDescriptionElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  eduSchoolElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "School")
    )
  );
  eduDegreeElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Degree")
    )
  );
  eduCityElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "City")
    )
  );
  eduStartDateElem?.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "Start Date")
    )
  );
  eduGraduationDateElem?.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target, validType.ANY, "Graduation Date")
    )
  );
  eduDescriptionElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  projTitleElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Title")
    )
  );
  projLinkElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Link")
    )
  );
  projDescriptionElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "Description")
    )
  );
  skillElem?.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target, validType.ANY, "skill")
    )
  );

  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(
      ["achieve_title", "achieve_description"],
      achievementsTitleElem,
      achievementsDescriptionElem
    ),
    experiences: fetchValues(
      [
        "exp_title",
        "exp_organization",
        "exp_location",
        "exp_start_date",
        "exp_end_date",
        "exp_description",
      ],
      expTitleElem,
      expOrganizationElem,
      expLocationElem,
      expStartDateElem,
      expEndDateElem,
      expDescriptionElem
    ),
    educations: fetchValues(
      [
        "edu_school",
        "edu_degree",
        "edu_city",
        "edu_start_date",
        "edu_graduation_date",
        "edu_description",
      ],
      eduSchoolElem,
      eduDegreeElem,
      eduCityElem,
      eduStartDateElem,
      eduGraduationDateElem,
      eduDescriptionElem
    ),
    projects: fetchValues(
      ["proj_title", "proj_link", "proj_description"],
      projTitleElem,
      projLinkElem,
      projDescriptionElem
    ),
    projectTitle: projTitleElem,
    projectDes: projDescriptionElem,
    skills: fetchValues(["skill"], skillElem),
    languages: fetchValues(["language"], languageElem),
  };
};

// remove display elements
let achieveRemoveBtn = document.querySelector(".achievements-remove-btn");
let achieveAddBtn = document.querySelector(".achievements-add-btn");
if (achieveRemoveBtn !== null) {
  achieveRemoveBtn.addEventListener("click", () => {
    document.getElementById("achievements").style.display = "none";
    achieveAddBtn.style.visibility = "visible";
    achieveRemoveBtn.style.visibility = "hidden";
  });
  achieveAddBtn.addEventListener("click", () => {
    document.getElementById("achievements").style.display = "block";
    achieveRemoveBtn.style.visibility = "visible";
    achieveAddBtn.style.visibility = "hidden";
  });
}

let experiencesRemoveBtn = document.querySelector(".experiences-remove-btn");
let experiencesAddBtn = document.querySelector(".experiences-add-btn");
if (experiencesRemoveBtn !== null) {
  experiencesRemoveBtn.addEventListener("click", () => {
    document.getElementById("experiences").style.display = "none";
    experiencesAddBtn.style.visibility = "visible";
    experiencesRemoveBtn.style.visibility = "hidden";
  });
  experiencesAddBtn.addEventListener("click", () => {
    document.getElementById("experiences").style.display = "block";
    experiencesRemoveBtn.style.visibility = "visible";
    experiencesAddBtn.style.visibility = "hidden";
  });
}

let projectsRemoveBtn = document.querySelector(".projects-remove-btn");
let projectsAddBtn = document.querySelector(".projects-add-btn");
if (projectsRemoveBtn !== null) {
  projectsRemoveBtn.addEventListener("click", () => {
    document.getElementById("projects").style.display = "none";
    projectsAddBtn.style.visibility = "visible";
    projectsRemoveBtn.style.visibility = "hidden";
  });
  projectsAddBtn.addEventListener("click", () => {
    document.getElementById("projects").style.display = "block";
    projectsRemoveBtn.style.visibility = "visible";
    projectsAddBtn.style.visibility = "hidden";
  });
}

// validation function
function validateFormData(elem, elemType, elemName) {
  // checking for text string and non empty string
  if (elemType == validType.TEXT) {
    if (!strRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only text string
  if (elemType == validType.TEXT_EMP) {
    if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for email
  if (elemType == validType.EMAIL) {
    if (!emailRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for phone number
  if (elemType == validType.PHONENO) {
    if (!phoneRegex.test(elem.value) || elem.value.trim().length == 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only empty
  if (elemType == validType.ANY) {
    if (elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }
}

// adding the invalid text
function addErrMsg(formElem, formElemName) {
  formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text
function removeErrMsg(formElem) {
  formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
  if (listContainer !== null) {
    listContainer.innerHTML = "";

    if (listData !== undefined) {
      listData.forEach((listItem) => {
        let itemElem = document.createElement("div");
        itemElem.classList.add("preview-item");
        for (const key in listItem) {
          let subItemElem = document.createElement("span");
          subItemElem.classList.add("preview-item-val");
          subItemElem.innerHTML = `${listItem[key]}`;
          itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
      });
    }
  } 
};

const displayCV = (userData) => {
  if (middlenameElem !== undefined) {
    nameDsp.innerHTML =
      userData.firstname + " " + userData.middlename + " " + userData.lastname;
  } else {
    nameDsp.innerHTML = userData.firstname + " " + userData.lastname;
  }

  phonenoDsp.innerHTML = userData.phoneno;
  emailDsp.innerHTML = " " + userData.email;
  addressDsp.innerHTML = " " + userData.address;
  designationDsp.innerHTML = userData.designation;
  summaryDsp.innerHTML = userData.summary;
  showListData(userData.projects, projectsDsp);
  showListData(userData.achievements, achievementsDsp);
  showListData(userData.skills, skillsDsp);
  showListData(userData.languages, languagesDsp);
  showListData(userData.educations, educationsDsp);
  showListData(userData.experiences, experiencesDsp);
};

// generate CV
const generateCV = () => {
  let userData = getUserInputs();
  displayCV(userData);
  console.log(userData);
};

function previewImage() {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(imageElem.files[0]);
  oFReader.onload = function (ofEvent) {
    imageDsp.src = ofEvent.target.result;
  };
}

// print CV
function printCV() {
  window.print();
}

function getListData(list, listTitle, listItemsName) {
  itemsList = [];
  itemsStr = "";
  for (let i = 0; i < user_data[listTitle].length; i++) {
    itemsList.push(` ${list[listTitle][i][listItemsName]}`);
  }

  itemsStr = itemsList.toString();
  return itemsStr;
}

let summary_btn = document.getElementById("summary-btn");
let input_text = "";

if(summary_btn){
summary_btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let user_data = getUserInputs();
  console.log(user_data)
    input_text = "";
    if (true) {
      //input validation and user message making
      let input_text = "";

      // Job title
      if (designationElem.value) {
        input_text += `${designationElem.value}`;
      }
      // Education
        // Degree
        if (user_data.educations && user_data.educations[0]?.edu_degree) {
          input_text += `, who got a ${user_data.educations[0].edu_degree}`;
        }
        
        // School
        if (user_data.educations && user_data.educations[0]?.edu_school) {
          input_text += ` from ${user_data.educations[0].edu_school}`;
        }
          // start date
          if (user_data.educations && user_data.educations[0]?.edu_start_date) {
            input_text += ` starting from ${user_data.educations[0].edu_start_date}`;
          }
          // end date
          if (user_data.educations && user_data.educations[0]?.edu_graduation_date) {
            input_text += ` to ${user_data.educations[0].edu_graduation_date}`;
          }
      // Skills
      if (user_data.skills && user_data.skills[0]?.skill) {
        input_text += `, skilled at ${user_data.skills[0].skill}.`;
      }
      
      // Achievements
      if (user_data.achievements && user_data.achievements[0]?.achieve_title) {
        input_text += `, also have achieved ${user_data.achievements[0].achieve_title}`;
      }

      // Experience
      if (user_data.experiences && user_data.experiences[0]?.exp_title) {
        input_text += `, and also ${user_data.experiences[0].exp_title}`;
      }
        // start date
        if (user_data.experiences && user_data.experiences[0]?.exp_start_date) {
          input_text += `starting from ${user_data.experiences[0].exp_start_date}`;
        }
        // end date
        if (user_data.experiences && user_data.experiences[0]?.exp_end_date) {
          input_text += ` to ${user_data.experiences[0].exp_end_date}`;
        }

      // Projects
      if (user_data.projects && user_data.projects[0]?.proj_title) {
        input_text += `, have done these projects: ${user_data.projects[0].proj_title}`;
      }
      
      // Projects Description (Assuming you want to use this)
      // if (user_data.projects && user_data.projects[0]?.proj_description) {
      //   input_text += ` Description: ${user_data.projects[0].proj_description}.`;
      // }
      
  
      console.log(input_text);
      console.log("**************************");



  
      //tiiuae/falcon-7b-instruct
      //meta-llama/Meta-Llama-3-8B-Instruct
      

      input_text // user message
      let outputElem = summaryElem // output element

      if (!input_text) {
        summaryElem.value = "Please add your details"
        return;
      }

    

    try{
      let assistantMessage = "Make a resume summary as first person in a single short paragraph." // Assistant Message
      summaryElem.value = "...";
      const response = await fetch('api/inference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({input_text, assistantMessage})
      });
      if (!response.ok){
        throw new Error('Network response was not ok')
      }
      const data = await response.json();
      console.log(data)
      summaryElem.value = data.result;
      generateCV()
    }catch (error) {
      summaryElem.value = 'Error' + error.message;
      console.error('There was a problem with the fetch operation', error)
    }
    

    console.log(input_text)
    let projElem = user_data["projectTitle"]

    for (let i = 0; i < projElem.length; i++) {
      try{
        input_text = projTitle = user_data.projects[i].proj_title + "."
        let projDes = user_data["projectDes"][i]
        projDes.value = "..."
        let assistantMessage =  "make a first person describtion for the project in a single 100 words maximum paragraph." // Assistant Message
        const response = await fetch('api/inference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ input_text, assistantMessage})
        });
        if (!response.ok){
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        console.log(data.result)
        projDes.value = data.result;
        generateCV()
      }catch (error) {
        projElem.value = 'Error' + error.message;
        console.error('There was a problem with the fetch operation', error)
      }
    }

  }
  });
}





//send data to server

window.onload = generateCV;

function saveResumeData() {
  // Get the full URL of the current page
  const urlParams = new URLSearchParams(window.location.search);

  // Retrieve the value of a specific query parameter (e.g., ?name=John)
  const type = urlParams.get("type");

  let userData = getUserInputs();

  const formData = new FormData();
  formData.append("cv_details", JSON.stringify(userData));
  formData.append("image", imageElem.files[0]);
  formData.append("type", type);

  fetch("/handleresume", {
    method: "POST",

    body: formData,
  })
    .then((res) => console.log(res))
    .then(window.alert("Your data has been saved successfully"))
    .catch((err) => console.log(err));
}
window.saveResumeData = saveResumeData


function saveResumeDataAts() {
  // Get the full URL of the current page
  const urlParams = new URLSearchParams(window.location.search);

  // Retrieve the value of a specific query parameter (e.g., ?name=John)
  const type = urlParams.get("type");

  let userData = getUserInputs();

  const formData = new FormData();
  formData.append("cv_details", JSON.stringify(userData));

  formData.append("type", type);

  fetch("/handleresume", {
    method: "POST",

    body: formData,
  })
    .then((res) => console.log(res))
    .then(window.alert("Your data has been saved successfully"))
    .catch((err) => console.log(err));
}

window.saveResumeDataAts = saveResumeDataAts
