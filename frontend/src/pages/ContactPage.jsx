import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import CommomImg from "@/components/CommonBackgroundImg"
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { useMailSendMutation } from "@/redux/features/shubamdevApi"

export default function ContactForm() {
  const contactData = [
    { icon: <Phone size={28} />, text: "Call : +91 9024 195 195" },
    { icon: <Mail size={28} />, text: "info@subhamdevelopers.com" },
    { icon: <MapPin size={28} />, text: "BCM SHUBHAM BUILDERS LLP 861/C, Chopasni Road, Near Bombay Motors Chouraha, Jodhpur (Rajasthan)" },
  ];

  const [mailSend, { isLoading }] = useMailSendMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const finalData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message,
      
    };
    

    console.log(finalData)
    await toast.promise(mailSend(finalData).unwrap(), {
      loading: "Sending your message...",
      success: "Mail sent successfully!",
      error: "Failed to send email",
    });

    reset(); // reset form after sending
  };

  return (
    <>
      <CommomImg page="Contact us" />

      <section className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#D2AB48] text-lg font-medium">
          Have Any Queries?
        </p>
        <h2 className="text-center text-3xl font-semibold mt-2">
          Reach Out To Us Today!!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">First Name</Label>
              <Input
                placeholder="Enter your first name"
                className="border-[#C29A2D] h-12 w-full"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Last Name</Label>
              <Input
                placeholder="Enter your last name"
                className="border-[#C29A2D] h-12 w-full"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label className="mb-2 block">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 border-[#C29A2D] w-full"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label className="mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 border-[#C29A2D] w-full"
              maxLength={10}
              {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit Indian phone number" },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label className="mb-2 block">Message</Label>
            <Textarea
              rows={5}
              placeholder="Enter your message"
              className="border-[#C29A2D] min-h-[120px] w-full"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#C29A2D] hover:bg-[#B58920] cursor-pointer text-black font-medium w-full rounded-xl py-6 text-lg"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>

      {/* CONTACT CARDS + LOCATION SECTION remains same */}
    </>
  );
}
