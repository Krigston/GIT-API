const Autocomplete = (selector,  data, name, owner, stargazers_count) => {

    let inputs = document.querySelectorAll(selector);

    function ciSearch(what = '', where = '') {
        return where.toUpperCase().search(what.toUpperCase());
    }

    inputs.forEach(input => {

        input.classList.add('autocomplete-input');
        let wrap = document.createElement('div');
        wrap.className = 'autocomplete-wrap';
        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);

        let list = document.createElement('div');
        list.className = 'autocomplete-list';
        wrap.appendChild(list);

        let matches = [];
        let listItems = [];
        let focusedItem = -1;

        function setActive(active = true) {
            if(active)
                wrap.classList.add('active');
            else
                wrap.classList.remove('active');
        }

        function focusItem(index) {
            if(!listItems.length) return false;
            if(index > listItems.length - 1) return focusItem(0);
            if(index < 0) return focusItem(listItems.length - 1);
            focusedItem = index;
            unfocusAllItems();
            listItems[focusedItem].classList.add('focused');
        }
        function unfocusAllItems() {
            listItems.forEach(item => {
                item.classList.remove('focused');
            });
        }
        function selectItem(index) {
            if(!listItems[index]) return false;
            input.value = listItems[index].innerText;
            setActive(false);
        }

        input.addEventListener('input', () => {

            let value = input.value;
            if(!value) return setActive(false);

            list.innerHTML = '';
            listItems = [];

            data.forEach((dataItem, index) => {

                let search = ciSearch(value, dataItem);
                if(search === -1) return false;
                matches.push(index);

                let parts = [
                    dataItem.substr(0, search),
                    dataItem.substr(search, value.length),
                    dataItem.substr(search + value.length, dataItem.length - search - value.length)
                ];

                let item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = parts[0] + '<strong>' + parts[1] + '</strong>' + parts[2];
                list.appendChild(item);
                listItems.push(item);

                const container = document.querySelector('.container-repos');

                item.addEventListener('click', function() {
                    selectItem(listItems.indexOf(item));

                    function clear() {
                        document.querySelector('.autocomplete-input').value = '';
                    }
                    clear()

            const fragment = document.createDocumentFragment();
            const card = document.createElement("div");
            card.classList.add('card');
            const cardBody = document.createElement("div");
            cardBody.classList.add('card-body');

            const info = document.createElement('div');
            info.classList.add('card-info');

            function addElement(text, element) {
                const repos = element[index];
                const reposItem = document.createElement('p');
                reposItem.classList.add('card-stars', 'text-p');
                reposItem.textContent = text + repos;
                console.log(reposItem)
                info.appendChild(reposItem)
                return reposItem;
            }

            addElement("Name: ",name)
            addElement("Owner: ",owner)
            addElement("Stars: ",stargazers_count)

             const deleteElement = document.createElement('img');
             deleteElement.classList.add('delete-bottom');
             deleteElement.src = 'img/delete.png';

             cardBody.appendChild(info)
             cardBody.appendChild(deleteElement)
             card.appendChild(cardBody);
             fragment.appendChild(card)
             container.appendChild(fragment);
             deleteItem(deleteElement, card)
                });

                function deleteItem(deleteElement, card) {
                    deleteElement.addEventListener('click', function () {
                        card.parentNode.removeChild(card);
                    });
                }
            });
            if(listItems.length > 0) {
                focusItem(0);
                setActive(true);
            }
            else setActive(false);

        });

        document.body.addEventListener('click', function(e) {
            if(!wrap.contains(e.target)) setActive(false);
        });

    });

}