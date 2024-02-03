'use client';

export async function fillInForm(step: number, programType: string, prevState: any, formData: FormData) {

  switch (step) {
    case 1:
      let location = formData.get('location');
      console.log('location', location)
      return {
        ...prevState,
        location: location ?? ''
      }
      break;
    case 2: break;
  }

}