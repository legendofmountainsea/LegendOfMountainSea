import $ from 'jquery';

export function consoleAlert(message){
	showConsole('danger', message);
}

export function consoleWarning(message) {
	showConsole('warning', message);
}

function showConsole(type, message) {
	const alertTemplate = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${message}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
	
	$('#DevConsoleContainer').append(alertTemplate);
}