import { Schema, model } from 'mongoose';
import { IAuthProvider, IUser } from './user.interfaces';

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['ADMIN', 'RIDER', 'DRIVER'],
      default: 'RIDER',
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    // isVerified: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false },
    
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>('User', userSchema);
