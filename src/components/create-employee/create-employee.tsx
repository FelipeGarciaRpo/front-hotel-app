"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/context/auth-context";

const formSchema = z
  .object({
    name: z
      .string()
      .min(4, {
        message: "El nombre de usuario debe tener al menos 4 caracteres.",
      })
      .regex(/^[^0-9]*$/, {
        message: "El nombre de usuario no puede contener números.",
      }),
    email: z.string().email({
      message: "Debe ser un correo electrónico válido.",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener por lo menos 8 caracteres.",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula.",
      })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula.",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "La contraseña debe contener al menos un carácter especial.",
      }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export function CreateEmployee() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { accessToken } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Registro exitoso: por favor ingresa");
      } else {
        toast.error("Error en el registro, intenta de nuevo");
      }
    } catch (error) {
      toast.error("Error del servidor, intenta mas tarde");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="nombre y apellido"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  type="email"
                  placeholder="Tu Correo"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    className="w-[310px] bg-[#faf9f5] border border-orange-300"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    {...field}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    className="w-[310px] bg-[#faf9f5] border border-orange-300"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma la contraseña"
                    {...field}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />

        <Button
          className=" mt-4 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
