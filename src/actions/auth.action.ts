"use server" 
import { loginPayloadType } from "@/schema/login.schema";
import { RegisterPayloadType } from "@/schema/register.schema";
import { cookies } from "next/headers";
export  async function loginHandler(formValues:loginPayloadType) {
  try {
  
  const resp=await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
    method:"POST",
    body:JSON.stringify(formValues),
    headers:{
    "Content-Type":"application/json"
   },
  })

const data=await resp.json();
if(!resp.ok){
  throw new Error(data.message || "something went wrong")
}
const cookie =await cookies();
cookie.set ("user-token",data.token,{
  httpOnly:true,
  maxAge:60*60*24*7
});
return data;

} catch (error) {
  console.log(error);
  return error;
}
}


export async function registerHandler(formValues: RegisterPayloadType) {
  try {
    console.log("registerHandler fired", formValues); 
    
    const resp = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });

    const data = await resp.json();
    console.log("API response:", data); 
    
    if (!resp.ok) {
      throw new Error(data.message || "something went wrong");
    }

    return { ...data, ok: true };
    
  } catch (error) {
    console.log("ERROR:", error); 
    return { error, ok: false };
  }
}



export async function forgotPassword(email: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return { ok: res.ok, message: data.message };
}

export async function verifyResetCode(resetCode: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });
  const data = await res.json();
  return { ok: res.ok, message: data.message };
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await res.json();
  return { ok: res.ok, message: data.message, token: data.token };
}