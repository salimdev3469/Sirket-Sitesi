import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Ad soyad en az 2 karakter olmalıdır.')
    .max(80, 'Ad soyad en fazla 80 karakter olabilir.'),
  email: z.string().trim().email('Lütfen geçerli bir e-posta adresi girin.'),
  company: z.string().trim().max(120, 'Firma adı en fazla 120 karakter olabilir.').optional(),
  phone: z.string().trim().max(40, 'Telefon alanı en fazla 40 karakter olabilir.').optional(),
  message: z
    .string()
    .trim()
    .min(20, 'Mesaj en az 20 karakter olmalıdır.')
    .max(2000, 'Mesaj en fazla 2000 karakter olabilir.')
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
