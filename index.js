const state = {
    taskList: [],
  };
  
  // DOM Operations
  const taskContents = document.querySelector(".task__contents");
  const taskModal = document.querySelector(".task__modal__body");
  
  // console.log(taskContents);
  // console.log(taskModal);
  
  const htmlTaskContent = ({ id, title, description, type, url }) =>`
  <div class="col-md-6 col-lg-4 mt-3" id=${id}>
    <div class='card shadow-sm task__card'>
    
      <div class='card-header d-flex justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-primary mr-1.5' name=${id}>
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
           <button type='button' class='btn btn-outline-danger mr-1.5' name=${id}>
              <i class='fas fa-trash-alt name=${id}'></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            url &&
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span> class='badge bg-primary m-1'${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
      </div>
    </div>
  </div>
`;

// Modal Body on >> Clk of Open Task
const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
  <div id=${id}>
     ${
       url &&
       //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
       `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
     }
     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'>${title}</h2>
     <p class='text-muted'>${description}</p>
  </div>
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
  };
  

  const handleSubmit = (event) => {
    // console.log("event triggerd");
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("taskTitle").value,
      type: document.getElementById("tags").value,
      description: document.getElementById("taskDescription").value,
    };

    taskContents.insertAdjacentHTML(
        "beforeend",
        htmlTaskContent({ ...input, id })
      );
      state.taskList.push({ ...input, id });
    
      updateLocalStorage();
    };
    
