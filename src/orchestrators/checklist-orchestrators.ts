import taskConfig from "./checklist.config.json";

const container = document.getElementById('checklist');
const checklistComponent = document.createElement('pl-checklist') as any;

checklistComponent.headerTitle = "Checklist title"
checklistComponent.headerDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum odit quaerat aspernatur illum enim quo aut. Consequuntur at nesciunt accusantium nemo maiores. "
checklistComponent.tasks = taskConfig;

checklistComponent.addEventListener("primary-button-" + 1, (e: Event) => {
  alert(JSON.stringify((e as CustomEvent).detail))
});

checklistComponent.addEventListener("secondary-button-" + 1, (e: Event) => {
    alert("Secondary" + JSON.stringify((e as CustomEvent).detail))
});

container?.appendChild(checklistComponent);

setTimeout(async () => {
    await checklistComponent.open();
}, 0);