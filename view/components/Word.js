export class Word{

    constructor(word, type, index, totalWords, handleRemoveLastWord) {
        this.word = word;
        this.type = type;
        this.index = index;
        this.totalWords = totalWords;
        this.handleRemoveLastWord = handleRemoveLastWord;
    }

    createLi(){
        const li = document.createElement('li');
        // masquer les mots précédants
        li.textContent = '...';
        li.dataset.type = this.type;
        li.classList.add('enter');

        return li;
    }

    createWordType(){
        const wordType = document.createElement('span');

        wordType.textContent = this.type;
        wordType.classList.add('type');

        return wordType;
    }

    createDelButton(){
        const delBtn = document.createElement("button");

        delBtn.classList.add('actionBtn');
        delBtn.textContent = '❌';
        delBtn.addEventListener('click', () => this.handleRemoveLastWord());

        return delBtn
    }

    createWord(){
        const li = this.createLi();
        const wordType = this.createWordType();

        if(this.index == this.totalWords - 1){
            const delBtn = this.createDelButton();
            li.textContent = this.word;

            li.append(delBtn);
        }

        li.append(wordType);

        return li;
    }

}