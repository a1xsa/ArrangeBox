"use strict";
(function () {

    const mainContainer = document.getElementById("mainconteiner");

    const mainArr = {

        avalible: ["apple", "orange", "red", "vegetable", "car", "house", "event", "walk"],

        selectedleft: [],

        selectedright: [],

        createElements: function () {//создание контейнеров для элементов

            let buttonsContainerLeft = document.createElement("div");
            mainContainer.appendChild(buttonsContainerLeft);
            buttonsContainerLeft.className = "buttonContainerLeft";

            let contField = document.createElement("div");
            mainContainer.appendChild(contField);
            contField.id = "contField";
            contField.className = "contField"

            let field = document.createElement("input");
            contField.appendChild(field);
            field.id = "search";

            let container1 = document.createElement("div");
            contField.appendChild(container1);
            container1.className = "container1";
            container1.id = "cont1";

            let buttonsContainer = document.createElement("div");
            mainContainer.appendChild(buttonsContainer);
            buttonsContainer.className = "buttonContainer";

            let container2 = document.createElement("div");
            mainContainer.appendChild(container2);
            container2.className = "container2";
            container2.id = "cont2";

            mainArr.firstContainer = container1;
            mainArr.secondContainer = container2;
            mainArr.buttons = buttonsContainer;
            mainArr.buttonsSort = buttonsContainerLeft;
            mainArr.search = field;
        },

        fillingFields: function () {//заполнение контейнера1 изначальными элементами
            let countId = 0;
            let conteiner = this.firstContainer

            for (let elem of this.avalible) {
                countId++;
                elem = document.createElement("div");
                conteiner.appendChild(elem);
                elem.id = countId;
                elem.className = "containerElem";
                elem.innerHTML = this.avalible[elem.id - 1];

            }
        },

        createButtons: function () {//создание кнопок
            let buttonsContainer = this.buttons;
            let buttonContainerLeft = this.buttonsSort;

            let butUp = document.createElement("button");
            buttonContainerLeft.appendChild(butUp);
            butUp.className = "buttonCntnrElem ";
            butUp.id = "up";
            butUp.textContent = '\u2191';
            mainArr.up = butUp;

            let butDown = document.createElement("button");
            buttonContainerLeft.appendChild(butDown);
            butDown.className = "buttonCntnrElem ";
            butDown.id = "down";
            butDown.textContent = '\u2193';
            mainArr.down = butDown;

            let butRight = document.createElement("button");
            buttonsContainer.appendChild(butRight);
            butRight.className = "buttonCntnrElem ";
            butRight.id = "right";
            butRight.textContent = " > ";
            mainArr.right = butRight;

            let butRightAll = document.createElement("button");
            buttonsContainer.appendChild(butRightAll);
            butRightAll.className = "buttonCntnrElem ";
            butRightAll.id = "rightAll";
            butRightAll.textContent = " >> ";
            mainArr.rightAll = butRightAll;

            let butLeft = document.createElement("button");
            buttonsContainer.appendChild(butLeft);
            butLeft.className = "buttonCntnrElem ";
            butLeft.id = "left";
            butLeft.textContent = " < ";
            mainArr.left = butLeft;

            let butleftAll = document.createElement("button");
            buttonsContainer.appendChild(butleftAll);
            butleftAll.className = "buttonCntnrElem ";
            butleftAll.id = "leftAll";
            butleftAll.textContent = " << ";
            mainArr.leftAll = butleftAll;

        },
    }

    mainArr.createElements();
    mainArr.fillingFields();
    mainArr.createButtons();

    function mouseClick(event) {//выделение элемента для перемещения
        if (event.target.classList.contains("containerElem")) {
            event.target.classList.toggle("active");
            let catched = mainArr.selectedleft.findIndex((item) => Number(item.id) === Number(event.target.id));
            if (catched === -1) {
                catched = mainArr.selectedright.findIndex((item) => Number(item.id) === Number(event.target.id))
            }
            if (catched !== -1) {
                if (event.target.parentElement.id === mainArr.firstContainer.id) {
                    mainArr.selectedleft.splice(catched, 1);
                }
                else {
                    mainArr.selectedright.splice(catched, 1);
                }
            } else {
                if (event.target.parentElement.id === mainArr.firstContainer.id) {
                    mainArr.selectedleft.push(event.target);
                }
                else {
                    mainArr.selectedright.push(event.target);
                }
            }
        }
    }

    mainArr.firstContainer.addEventListener("click", mouseClick);
    mainArr.secondContainer.addEventListener("click", mouseClick);

    function handleMove(event) {//перемещение элементов из контейнера в контейнер
        if (event.target.id === mainArr.right.id) {
            for (let item of mainArr.selectedleft) {
                if (item.parentElement === mainArr.firstContainer) {
                    mainArr.secondContainer.appendChild(item);
                    item.classList.toggle("active");
                }
            }
            mainArr.selectedleft = [];
        } else if (event.target.id === mainArr.leftAll.id) {
            Array.from(mainArr.secondContainer.querySelectorAll(".containerElem")).forEach((item) => {
                mainArr.firstContainer.appendChild(item);
                item.classList.remove("active");
            });
            mainArr.selectedright = [];
        } else if (event.target.id === mainArr.rightAll.id) {
            Array.from(mainArr.firstContainer.querySelectorAll(".containerElem")).forEach((item) => {
                mainArr.secondContainer.appendChild(item);
                item.classList.remove("active");
            });
            mainArr.selectedleft = [];
        } else if (event.target.id === mainArr.left.id) {
            for (let item of mainArr.selectedright) {
                if (item.parentElement === mainArr.secondContainer) {
                    mainArr.firstContainer.appendChild(item);
                    item.classList.toggle("active");
                }
            }
            mainArr.selectedright = [];
        }
    }

    mainArr.left.addEventListener("click", handleMove);
    mainArr.right.addEventListener("click", handleMove);
    mainArr.leftAll.addEventListener("click", handleMove);
    mainArr.rightAll.addEventListener("click", handleMove);

    function handleMoveUpDown(event) {//перемещение элементов пользователем внутри контейнера
        let indexes = [];
        if (event.target.id === mainArr.up.id) {
            for (let item of mainArr.selectedleft) {
                for (let i = 0; i < mainArr.firstContainer.children.length; i++) {
                    if (item.id === mainArr.firstContainer.children[i].id) {
                        indexes.push(i);
                    }
                }
            }
            indexes.sort(function (a, b) {
                return a - b;
            });
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] === 0) {
                    return;
                }
                let timediv = mainArr.firstContainer.children[indexes[i]];
                mainArr.firstContainer.insertBefore(timediv, mainArr.firstContainer.children[indexes[i] - 1])
            }
        }
        if (event.target.id === mainArr.down.id) {
            for (let item of mainArr.selectedleft) {
                for (let i = 0; i < mainArr.firstContainer.children.length; i++) {
                    if (item.id === mainArr.firstContainer.children[i].id) {
                        indexes.push(i);
                    }
                }
            }
            indexes.sort(function (a, b) {
                return b - a;
            });
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] === mainArr.firstContainer.children.length - 1) {
                    return;
                }
                let timediv = mainArr.firstContainer.children[indexes[i] + 1];
                mainArr.firstContainer.insertBefore(timediv, mainArr.firstContainer.children[indexes[i]])
            }
        }
    }

    mainArr.up.addEventListener("click", handleMoveUpDown);
    mainArr.down.addEventListener("click", handleMoveUpDown);

    function search(event) {//поиск элемента в container1
        let text = event.target.value;
        let innactive = mainArr.buttonsSort.children;
        if (text != "") {
            for (let button of innactive) {
                button.disabled = true;
            }
        }
        else {
            for (let button of innactive) {
                button.disabled = false;
            }

        }
        for (let item of mainArr.firstContainer.children) {
            item.style.display = 'none';
            if (item.innerHTML.includes(text) == true) {
                item.style.display = 'block';
            }
        }
    }

    mainArr.search.addEventListener('input', search);

})()