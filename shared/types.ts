export class UserFlow {
    uuid?: string
    user_id?: string
    session_id?: string
    path?: string
    css?: string
    text?: string
    value?: string
    event_time?: Date | null

    constructor(flow: Partial<UserFlow>) {
        this.uuid = flow.uuid
        this.user_id = flow.user_id
        this.session_id = flow.session_id
        this.path = flow.path
        this.css = flow.css
        this.text = flow.text
        this.value = flow.value
        this.event_time =  flow.event_time ? new Date(flow.event_time) : null
    }
}