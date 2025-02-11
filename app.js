"use strict";

let taskName, taskDuration, taskDescription;

class Task {
  taskListContainer = document.querySelector(".task-list-container");

  popAddTaskBtn = document.querySelector(".add-task--btn");

  formCancelBtn = document.querySelector(".btn-form-cancel");

  formSubitBtn = document.querySelector(".btn-form-submit");

  taskForm = document.querySelector(".task-form-container");

  formOverlay = document.querySelector(".form-overlay");

  bodyEl = document.querySelector("body");

  errorLabel = document.querySelector(".task-valid-error");

  // Forms Input
  formTaskName = document.querySelector("#td-task-name");
  formTaskDUration = document.querySelector("#td-task-hours");
  formTaskDescription = document.querySelector("#td-task-description");

  tasksList = [];

  // constructor(title, duration) {
  //   this.title = title;
  //   this.duration = duration;
  // }

  getTaskInputs() {
    taskName = this.formTaskName.value;
    taskDuration = +this.formTaskDUration.value;
    taskDescription = this.formTaskDescription.value;
  }

  clearTaskInputs() {
    this.formTaskName.value = this.formTaskDUration.value = this.formTaskDescription.value = "";
  }

  checkCheckbox() {
    let checkBox = document.querySelector(".task-checkbox");

    checkBox.addEventListener("click", function () {
      if (checkBox.checked == true) {
        document.querySelector(".task-list").classList.toggle("task-completed");

        // clearInterval(timer);
      } else {
        document.querySelector(".task-list").classList.toggle("task-completed");
      }
    });

    // this.setTaskTimer(0);
  }

  // taskCompleteTimer() {
  //   let taskDuration = 120;

  //   let duration = 1 * 60;

  //   let timer;

  //   //* Mistake
  //   // if (duration > 0) {
  //   //   timer = setInterval(() => {
  //   //     // duration--;
  //   //     // console.log(duration);
  //   //   }, 100);
  //   // } else {
  //   //   clearInterval(timer);
  //   // }

  //   timer = setInterval(() => {
  //     if (duration > 0) {
  //       // duration--;
  //       // console.log(duration);
  //     } else {
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }

  setTaskTimer(time) {
    const runTimer = document.querySelector(".run-timer");

    let timer = setInterval(() => {
      let min = String(Math.trunc(time / 60)).padStart(2, 0);
      let sec = String(time % 60).padStart(2, 0);

      // console.log(min, sec);

      // const min = time / sec;
      runTimer.textContent = `${min}: ${sec}`;
      time--;

      if (time === 0) {
        document.querySelector(".task-list").classList.toggle("task-completed");
        clearInterval(timer);
      }
    }, 1000);
  }

  showTaskPopup() {
    this.popAddTaskBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        this.formOverlay.classList.toggle("hidden");
        this.taskForm.classList.toggle("hidden");
      }.bind(this)
    );
  }

  addHiddenClass() {
    this.formOverlay.classList.add("hidden");
    this.taskForm.classList.add("hidden");
  }

  closeTaskPopup() {
    this.formCancelBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        // console.log("this:", this);

        if (!this.formOverlay.classList.contains("hidden") && !this.taskForm.classList.contains("hidden")) {
          this.addHiddenClass();
        }

        this.throwErr("");
      }.bind(this)
    );
  }

  throwErr(errTxt) {
    this.errorLabel.textContent = errTxt;
  }

  renderTask() {
    this.tasksList.map((task, index) => {
      const html = `
        <div class="task-list task-list--${index + 1}">
          <div class="task-list-detail-1 task-wrapper">
            <input class="task-checkbox" type="checkbox" />
            <h4 class="task-title">${task.taskName}</h4>
          </div>

          <div class="task-list-detail-2 task-wrapper">
            <h4 class="task-timer">${task.taskDuration < 30 ? task.taskDuration : task.taskDuration / 60} ${task.taskDuration > 30 ? "Hour" : "Minutes"}</h4>
            <div class="btn run-timer">00:00</div>
          </div>

           <div class="task-Desctiption">
            <p>${task.taskDescription}</p>
          </div>
        </div>
        `;

      this.taskListContainer.insertAdjacentHTML("afterbegin", html);

      this.setTaskTimer(task.taskDuration);
      // console.log(task.taskDuration, "task.taskDuration");
    });
  }

  addTaskToList() {
    this.formSubitBtn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        this.getTaskInputs();

        if (taskName === "" || taskDescription === "" || taskDuration === 0) {
          this.errorLabel.classList.remove("hidden");

          return this.throwErr("Please Enter Valid Data!");
        }

        const todoObj = {
          taskName,
          taskDuration,
          taskDescription,
        };

        this.tasksList.push(todoObj);

        console.log(this.tasksList);

        this.addHiddenClass();

        this.taskListContainer.innerHTML = "";

        this.renderTask();

        this.clearTaskInputs();

        this.checkCheckbox();

        // console.log(this.tasksList[0].taskDuration);
      }.bind(this)
    );
  }
}

// const app = new Task("javascript", 30);
const app = new Task();

app.showTaskPopup();
app.closeTaskPopup();
app.addTaskToList();

// console.log(app);

// this.bodyEl.addEventListener("click", function (e) {
//   console.log("e.target:", e.target.closest("body"));
//   e.target.closest("body");
// });
