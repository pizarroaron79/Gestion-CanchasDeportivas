import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublishedItem } from "@/app/Interface/annoucement";
import Image from "next/image";
import {API_URL} from "../../config";
interface AnnouncementFormProps {
  reloadAnnouncements: () => void; // Cambiar addPublishedItem por reloadAnnouncements
}

export function AnnouncementForm({ reloadAnnouncements }: AnnouncementFormProps) {
  const [formData, setFormData] = useState<PublishedItem>({
    title: "",
    description: "",
    image: null,
    status: true,
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${API_URL}/announcement`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        const imageUrl = result.image_url;

        // Recargar anuncios después de publicar
        reloadAnnouncements(); // Llamar a la función para recargar la tabla

        console.log("Anuncio enviado:", { ...formData, id: result.id, imageUrl });

        setFormData({ title: "", description: "", image: null, status: true });
        setUploadedImageUrl(imageUrl);
        alert("Anuncio publicado con éxito.");
      } else {
        throw new Error("Error al publicar el anuncio.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al intentar publicar el anuncio.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setUploadedImageUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3  p-4 sm:p-6 md:space-y-3 mt-8 lg:mt-2">
    <div>
      <Label className="block text-xs sm:text-sm md:text-[15px] font-medium">Título</Label>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full h-full p-2 border border-gray-300 rounded text-xs sm:text-[15px] text-[10px] min-h-[0px] sm:min-h-[27px] md:min-h-[28px]"
        placeholder="Escribe el título del anuncio"
        required
      />
    </div>
  
    <div>
      <Label className="block text-xs sm:text-sm md:text-[15px] font-medium">Subir Imagen</Label>
      <div
        className="w-full lg:h-52 sm:h-32 md:h-36  p-4 border border-[#C0BCBC] rounded-[30px] flex items-center justify-center cursor-pointer bg-[#F9F9F9]"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {!formData.image ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Image
              src="/subir.png"
              alt="Image Icon"
              width={50}
              height={50}
            />
            <p className="sm:text-[15px] text-[10px] md:text-[15px]">Haz clic o arrastra una imagen aquí</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={URL.createObjectURL(formData.image)}
              alt="Uploaded"
              width={100}
              height={100}
            />
            <Button
              onClick={() => {
                handleRemoveFile();
              }}
              size="icon"
            >
              X
            </Button>
          </div>
        )}
      </div>
      {uploadedImageUrl && (
        <div className="mt-4">
          <p className="text-xs sm:text-sm md:text-base">Imagen subida:</p>
          <Image
            src={uploadedImageUrl}
            alt="Uploaded URL"
            width={50}
            height={50}
          />
        </div>
      )}
    </div>
  
    <div>
      <Label className="block text-xs sm:text-sm md:text-base md:text-[15px] font-medium">Descripción</Label>
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full h-full p-2 border border-gray-300 rounded text-xs sm:text-[15px] text-[10px] min-h-[96px] sm:min-h-[102px] md:h-[8px] resize-none"
        rows={4}
        placeholder="Escribe la descripción del anuncio"
        required
      />
    </div>
  
    <Button type="submit" className="w-full bg-[#E1BC00] text-white hover:bg-[#9b8a38] font-bold text-xs sm:text-sm md:text-base">
      Publicar
    </Button>
</form>

  
  
  
  
  );
}
