import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import Cookies from 'js-cookie';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";

type IAuthorizeUserMutation = MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "", "authQueryApi">>

export default function handlePostCredentials(
   idToken:string,
   authorizeUser: IAuthorizeUserMutation,
   ){
   const csrfToken = Cookies.get('csrfToken') || '';
   authorizeUser({idToken,csrfToken})
}