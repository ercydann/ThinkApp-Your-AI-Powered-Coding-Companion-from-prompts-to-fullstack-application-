import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { userDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import uuid4 from "uuid4";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function SignInDialog({openDialog, closeDialog}) {
    const {userDetail, setUserDetail}=useContext(userDetailContext);
    const CreateUser = useMutation(api.users.CreateUser);
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer'+tokenResponse?.access_token  } },
        );
    
        console.log(userInfo);
        const user = userInfo.data;
        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4()
        })


        if(typeof window !== 'undefined'){
          localStorage.setItem('user', JSON.stringify(user))
        }

            setUserDetail(userInfo?.data);
            // SAVE THIS LOGIN DATA INSIDE OUR DATABASE
            closeDialog(false);

        },
        onError: errorResponse => console.log(errorResponse),
    });
  



  return (
    <Dialog open={openDialog} onOpenChange={closeDialog} suppressHydrationWarning>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
          <VisuallyHidden>My Hidden Title</VisuallyHidden>
          </DialogTitle>
          <DialogDescription >
            <span className="flex flex-col items-center justify-center gap-3" suppressHydrationWarning>
                <span className="font-bold text-2xl text-center text-white">{Lookup.SIGNIN_HEADING}</span>
                <span className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</span>
                <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>Sign In With Google
                </Button>

                <span>{Lookup.SIGNIn_AGREEMENT_TEXT}</span>


            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
