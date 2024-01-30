'use server';

export async function updateAdminUser(id: number, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log('rawFormData update', rawFormData, id);

  if (formData.has('name')) {
    return {
      res: { success: true, data: rawFormData }
    };
  }

  return undefined;
}

export async function addAdminUser(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log('rawFormData add', rawFormData);

  if (formData.has('name')) {
    return {
      res: { success: true, data: rawFormData }
    };
  }

  return undefined;
}