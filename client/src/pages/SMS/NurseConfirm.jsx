import { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageCircle } from 'lucide-react';
import NurseResponseContext from '../../context/NurseResponse';

export default function NurseConfirm() {
  
  const { whatsappLink, qrCodeImage } = useContext(NurseResponseContext); 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">Nurse Accepted Your Request</CardTitle>
            <CardDescription className="text-center">You can now communicate with your nurse</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
              <>
                <p className="text-lg font-semibold mb-4 text-center">
                  Click on the button or scan QR code:
                </p>
                <div className="w-full mb-6">
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                   <img src={qrCodeImage} alt="QR Code for WhatsApp Chat" />
                  </div>
                </div>
                <div className="w-full">
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white" 
                    onClick={() => window.open(whatsappLink, '_blank')}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Open WhatsApp Chat
                  </Button>
                </div>
              </>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
