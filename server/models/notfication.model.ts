import mongoose,{Document,Model,Schema} from "mongoose";

export interface INotification extends Document {
    title:string,
    message:string,
    status:string;
    userId:string
}

const notificationSchema = new Schema<INotification>({
    title: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    status: {
        type:String,
        default:'unread'
    },
}, { timestamps: true })

const NotificationModel : Model<INotification> = mongoose.model("notification",notificationSchema)

export default NotificationModel;