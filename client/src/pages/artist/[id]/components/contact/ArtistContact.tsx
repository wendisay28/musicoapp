import React from 'react';
import { Card, CardContent } from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ArtistContactProps {
  email: string;
  phone: string;
  socialMedia: Array<{
    platform: string;
    url: string;
  }>;
}

export function ArtistContact({ email, phone, socialMedia }: ArtistContactProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a
                href={`mailto:${email}`}
                className="text-purple-600 hover:underline"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <a
                href={`tel:${phone}`}
                className="text-purple-600 hover:underline"
              >
                {phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {socialMedia.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                {social.platform}
              </a>
            ))}
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Enviar Mensaje
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 