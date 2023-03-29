
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }
    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByTraits(people) {
    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of trait you would like to search:',
        ['gender', 'dob', 'height', 'weight', 'eyecolor', 'occupation']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'gender': 
            results = searchByGender(people);            
            break;
        case 'dob': 
            results = searchByDob(people);  
            break;
        case 'height':
            results = searchByHeight(people);
            break;
        case 'weight':
            results = searchByWeight(people);
            break;
        case 'eyecolor':
            results = searchByEyeColor(people);
            break;
        case 'occupation': 
            results = searchByOccupation(people);
            break;
        default:
            return searchByTraits(results);
    }
    return narrowChoice(results);
}

function searchByGender(people) {
    const genderSearch = validatedPrompt ('Please enter the gender of the person you are searching for',['male', 'female']);
    const genderFilterResults = people.filter(person => (person.gender.toLowerCase() === genderSearch.toLowerCase()));
    if(genderFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', genderFilterResults);
    }
    return (genderFilterResults)
}

function searchByDob(people) {
    const dobSearch = prompt ('Please enter the date of birth, formatted as MM/DD/YYYY, you are searching for.');
    const dobFilterResults = people.filter(person => (person.dob === dobSearch));
    if(dobFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', dobFilterResults);
    }
    return (dobFilterResults)
}

function searchByHeight(people) {
    const heightSearch = prompt('Please enter height of the person you are searching for.');
    const heightSearchInt = parseInt(heightSearch);
    const heightFilterResults = people.filter(person => (person.height === heightSearchInt));
    if(heightFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', heightFilterResults);
    }
    return (heightFilterResults)
}

function searchByWeight(people) {
    const weightSearch = prompt('Please enter weight of the person you are searching for.');
    const weightSearchInt = parseInt(weightSearch);
    const weightFilterResults = people.filter(person => (person.weight === weightSearchInt));
    if(weightFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', weightFilterResults);
    }
    return (weightFilterResults)
}

function searchByEyeColor(people) {
    const eyeColorSearch = validatedPrompt ('Please enter the eye color of the person you are searching for',
    ['brown', 'black', 'hazel', 'blue', 'green']);
    const eyeColorFilterResults = people.filter(person => (person.eyeColor.toLowerCase() === eyeColorSearch.toLowerCase()));
    if(eyeColorFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', eyeColorFilterResults);
    }
    return (eyeColorFilterResults)
}

function searchByOccupation(people) {
    const occupationSearch = validatedPrompt ('Please enter the occupation of the person you are searching for',
    ['programmer', 'assistant', 'landscaper', 'nurse', 'student', 'architect', 'doctor', 'politician']);
    const occupationFilterResults = people.filter(person => (person.occupation.toLowerCase() === occupationSearch.toLowerCase()));
    if(occupationFilterResults.length === 0) {
        alert("No results matching this search.")
    }
    else{
        displayPeople('Results', occupationFilterResults);
    }
    return (occupationFilterResults)
}

function narrowChoice(results){
    if(results.length <= 1){
        alert("No more results to narrow")
        return(results)
    }
    else{
        userChoice = validatedPrompt("Would you like to narrow your results by another trait?",['yes', 'no']).toLowerCase()
        if(userChoice === 'yes'){
            return searchByTraits(results);
        }
        else{
            return results
        }
    }
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            alert(personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}
function displayPersonInfo(person) {
    let personInfo = "Person Info:\n";
    personInfo += `First Name: ${person.firstName}\n`
    personInfo += `Last Name: ${person.lastName}\n`
    personInfo += `Gender: ${person.gender}\n`
    personInfo += `Date of Birth: ${person.dob}\n`
    personInfo += `Height: ${person.height}\n`
    personInfo += `Weight: ${person.weight}\n`
    personInfo += `Eye Color: ${person.eyeColor}\n`
    personInfo += `Occupation: ${person.occupation}\n`
    alert(personInfo)
}

function findPersonFamily(person, people) {
    let familyInfo = "Family Info:\n";
    let spouse = findSpouse(person, people)
    familyInfo += `Spouse: ${spouse.firstName} ${spouse.lastName}\n`;
    let parents = findParents(person, people)
    for (let i=0; i < parents.length; i++){ 
        familyInfo += `Parent: ${parents[i].firstName} ${parents[i].lastName}\n`;
    }
    let siblings = findSiblings(person, people)
    for (let i=0; i < siblings.length; i++){ 
        familyInfo += `Siblings: ${siblings[i].firstName} ${siblings[i].lastName}\n`;
    }
    let children = findChildren(person, people)
    for (let i=0; i < children.length; i++){ 
        familyInfo += `Children: ${children[i].firstName} ${children[i].lastName}\n`;
    }
    alert(familyInfo)
}

function findSpouse(person = {}, people = []) {
    let spouseName = people.filter(function(element){
        if(element.id === person.currentSpouse) {
            return true
        }
        else {
            return false
        }
    })
    return spouseName[0];
}

function findParents(person, people) {
    let parentArray = people.filter(function(element) {
        if(person.parents.includes(element.id)) {
            return true
        }
        else {
            return false
        }
    })
    return parentArray
}

function findSiblings(person, people) {
    let siblingArray = people.filter(function(element) {
        for (let i = 0; i < people.length; i++){
        if(element.parents[i] == person.parents) {
            return true
            }
            else {
                return false
            }
        }
    })
    return siblingArray
}

function findChildren(person, people) {
    let childrenArray = people.filter(function(element) {
        for (let i = 0; i < people.length; i++){
        if(element.parents[i] == person.id) {
            return true
            }
        }
    })
    return childrenArray
}

function findPersonDescendants(person, people) {
    let personId = person.id;
    let descendantsFullName = "";
    let personDescendants = people.filter(function(person) {
        if (person.parents.includes(personId)) {
            return true;
        }
    })
    if(personDescendants[0] === undefined) {
        descendantsFullName = `${person.firstName} ${person.lastName} has no known descendants.`
    } else {
            for (let i = 0; i < personDescendants.length; i++) {
            descendantsFullName += `${person.firstName} ${person.lastName} Descendant ${i+1}: ${personDescendants[i].firstName} ${personDescendants[i].lastName}\n`
            }
        }
    return descendantsFullName;
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}