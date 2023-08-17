import  { FloatingLabelInput } from '../../../lib/customInputs/FloatingLabelInput'
import  { AutoCompleteInput } from '../../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../../lib/customInputs/PasswordInput'
import  LoadingButton from '../../../lib/buttons/LoadingButton'
import { Link } from 'react-router-dom';
import { FieldErrors, SubmitHandler, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IFormData } from '../../vite-env';
import { AuthFormLocation } from '../../enums';


interface IAuthFormProps {
  handleSubmit: UseFormHandleSubmit<IFormData, undefined>,
  handleAuthRequest: SubmitHandler<IFormData>,
  register: UseFormRegister<IFormData>,
  location: string,
  setValue: UseFormSetValue<IFormData>,
  requestLoading: boolean,
  getValues:  UseFormGetValues<IFormData>,
  errors: FieldErrors<IFormData>
}

function AuthForm(props:IAuthFormProps) {

   const {
      handleSubmit,
      handleAuthRequest,
      register,
      location,
      setValue,
      requestLoading,
      getValues,
      errors
   } = props;

  return (
   <form onSubmit={handleSubmit(handleAuthRequest)}>
      <AutoCompleteInput
         registerField={register} 
         error={errors.email?.message} 
         setValue={setValue}
      />
      <AuthFormPasswordInput
         registerField={register} 
         error={errors.password?.message} 
      />
      {
         props.location === AuthFormLocation.SIGN_UP ?
         <FloatingLabelInput
            registerField={register} 
            error={errors.displayName?.message}
            getValues={getValues}
         />
         :
         ""
      }

      <div className="flex-row">
         <LoadingButton location={location} buttonType="submit" loading={requestLoading} />
         <Link to={props.location === AuthFormLocation.SIGN_UP ? "/auth/signin" : "/auth/create_account"}>
         {location === AuthFormLocation.SIGN_IN ? "Create Account" : "Sign In"}
         </Link>
      </div>
   </form>
  )
}

export default AuthForm