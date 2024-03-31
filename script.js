let data = JSON.parse(localStorage.getItem("notes")) || [];
let date;
function displayNote() {
  data.map((singleNote) => {
    if (singleNote) {
      addNote(singleNote);
    }
  });
}

displayNote();

const btn = document.getElementById("Addbtn");

btn.addEventListener("click", () => {
  addNote();
});
function addNote(notes = "") {
  let divEle = document.createElement("div");
  divEle.setAttribute("class", "singleNote");
  date = new Date().toLocaleString();
  divEle.innerHTML = ` 
  <div class="btns">
    <button class="addBtn"><span class="add 
    ${notes ? "hidden" : ""}">
    Add</span ><span class="edit 
    ${notes ? "" : "hidden"}">
    Edit</span ></button>
    <button class="deleteBtn">Remove</button>
  </div>
  <div>
    <div id="txtShow" class = "note ${notes ? "" : "hidden"}" ></div>
    <textarea name="text" class="note 
       ${notes ? "hidden" : ""}" 
      id="txtArea"></textarea>
  </div>
  <div class="date">
        <h4>${notes ? notes.date : date}</h4>
    </div>
  
  `;

  let addBtn = divEle.querySelector(".addBtn");
  let txtShow = divEle.querySelector("#txtShow");
  let txtArea = divEle.querySelector("#txtArea");
  let Add = divEle.querySelector(".add");
  let Edit = divEle.querySelector(".edit");

  txtShow.innerHTML = notes.val || "";
  txtArea.value = notes.val || "";

  // Add Note
  addBtn.addEventListener("click", () => {
    txtShow.innerHTML = txtArea.value;
    Add.classList.toggle("hidden");
    Edit.classList.toggle("hidden");
    txtArea.classList.toggle("hidden");
    txtShow.classList.toggle("hidden");
  });

  // Remove Note
  let removeBtn = divEle.querySelector(".deleteBtn");
  removeBtn.addEventListener("click", () => {
    document.getElementById("allNote").removeChild(divEle);
    updateStorage();
  });

  txtArea.addEventListener("input", (e) => {
    updateStorage();
  });

  document.getElementById("allNote").append(divEle);
}

function updateStorage() {
  let txtA = document.querySelectorAll("textarea");
  let data1 = [];
  txtA.forEach((e) => {
    if (e) {
      data1.push(e.value);
    }
  });
  data = [];
  let date = document.querySelectorAll(".date");
  date.forEach((e, i) => {
    data.push({ val: data1[i], date: e.textContent });
  });
  localStorage.setItem("notes", JSON.stringify(data));
}
updateStorage();
