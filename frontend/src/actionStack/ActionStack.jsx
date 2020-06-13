import { postError } from "../actions/errors"

const ACTION_NAME_KEY = "actionStack"
class ActionStack {
    constructor() {
        this._storeValue("init")
        this.counter = 0
    }

    _clear() {
        sessionStorage.removeItem(ACTION_NAME_KEY)
    }

    _storeValue(value) {
        sessionStorage.setItem(ACTION_NAME_KEY, value)
    }

    _getValue() {
        return sessionStorage.getItem(ACTION_NAME_KEY)
    }

    push(action) {
        if(this.counter >= 10) {
            this.sendInfoReport()
            this._clear()
            this._storeValue("init")
            this.counter = 0
        }
        this.counter++
        var stackAction = new StackAction(action);
        var stackTrace = this._getValue()
        stackTrace = `${stackTrace} | ${stackAction.toString()}`
        this._storeValue(stackTrace)
        
    }

    pushError(error) {
        var stackTrace = this._getValue()
        stackTrace = `${stackTrace} | error=${error}`
        this._storeValue(stackTrace)
    }

    sendInfoReport() {
        postError(this.buildPartial())
    }

    buildPartial() {
        return { stack: this._getValue(), type: 'partial' }
    }

    buildErrorReport() {
        return { stack: this._getValue(), type: 'report' }
    }

    buildErrorHandler() {
        return { stack: this._getValue(), type: 'error' }
    }
}

const ACTION_NAME = {
    SEARCH_MATCH: 'search_match',
    CREATE_MATCH_CLICK: 'create_match_click',
    CREATE_STAT_CLICK: 'create_stat_click',
    VIEW_STAT_CLICK: 'view_stat_click',
    REFRESH_MATCHES: 'refresh_matches',
    REMOVE_MATCH_CLICK: 'remove_match_click',
    BACK_CLICK: 'back_click',
    SAVE_PLAYERS_CLICK: 'save_players_click',
    SHOW_PLAYERS_LIST_CLICK: 'show_players_list_click',
    CREATE_MATCH_SAVE: 'create_match_save',
    ADD_PLAYER_CLICK: 'add_player_click',
    REMOVE_PLAYER_CLICK: 'remove_player_click',
    IMPORT_PLAYERS: 'import_players',
    SELECT_TYPE: 'select_type',
    SELECT_QUARTER: 'select_quarter',
    SELECT_ZONE: 'select_zone',
    SELECT_PLAYER: 'select_player',
    SUBMIT_STAT: 'submit_stat',
    ROTATE_FIELD: 'rotate_field',
    SPEECH_CLICK: 'speech_click',
    VIEW_STATS_PER_PLAYER: 'view_stats_per_player',
    VIEW_STATS_PER_TYPE: 'view_stats_per_type',
    PLAYER_FILTER: 'player_filter',
    STAT_FILTER: 'stat_filter',
    MATCH_REMOVE_FROM_FILTER: 'match_remove_from_filter',
    PLAYER_REMOVE_FROM_FILTER: 'player_remove_from_filter',
    STOP_RECORDING: 'stop_recording',
    START_RECORDING: 'start_recording',
}

class StackAction {
    constructor(actionName) {
        this.action = actionName
        this.url = window.location.pathname
    }

    toString() {
        return `action=${this.action};url=${this.url}`
    }
}

const actionStack = new ActionStack()

export { actionStack, ACTION_NAME };