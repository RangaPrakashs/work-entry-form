var app = (function init(){
    let $workEntryForm = $("[rel*=js-work-entry-form");
	let $workEntrySelectProject = $workEntryForm.find("[rel*=js-select-project]");
	let $workEntryDescription = $workEntryForm.find("[rel*=js-work-description]");
	let $workEntryTime = $workEntryForm.find("[rel*=js-work-time]");
    let $workEntrySubmit = $workEntryForm.find("[rel*=js-submit-work-entry]");
	let $totalTime = $("[rel*=js-total-work-time]");
    let $projectList = $("[rel*=js-project-list]");
    
    let projects = [];

    let projectTemplate = '<div class="project-entry"><h3'
    
    var handleClick = function(){
        let projectId = $workEntrySelectProject.val();
        let description = $workEntryDescription.val();
        let minutes = $workEntryTime.val();
        
        if(!validateWorkEntry(description,minutes)){
            alert('Work Entry is Not Proper, Please Check!');
            $workEntryDescription[0].focus();
            return;
        }

        $workEntryDescription.val('');
        $workEntryTime.val(''); 
        $workEntryDescription[0].focus();
        addWorkToProject(Number(projectId), description, Number(minutes));       

    };  

    $workEntrySubmit.on('click', handleClick); // call the submit button.

    function addProject(){
        let projectId = Math.round(Math.random()*1E4);
        let projectEntryData = {id : projectId, description : description, work:[], time : 0};
        projects.push(projectEntryData)

        addProjectToList(projectEntryData);
        addProjectToSelection(projectEntryData);

    };

    function addProjectToList(projectEntryData){
        let $project = $(projectTemplate);
        $project.attr('data-project-id', projectEntryData.id);
        $project.find('[rel*=js-project-description]').text(projectEntryData.description);
        $projectList.append($project);

        $projectEntryData.$element = $project;

    };
        
    function addProjectToSelection(projectEntryData){
        let $option = $("<option></option>");
        $option.attr("value",projectEntryData.id);
        $option.text(projectEntryData.description);
        $workEntrySelectProject.append($option);

    };

    function findProjectEntry(projectId){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].id===projectId){
                return projects[i];
            }
        }
    };

    function addWorkToProject(projectId, description, minutes){
        
        projects.time = (projects.time || 0) + minutes;
    }





})();