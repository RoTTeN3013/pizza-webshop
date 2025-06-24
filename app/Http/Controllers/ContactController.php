<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;

use Inertia\Inertia;

class ContactController extends Controller
{
    public function index() {
        return Inertia::render('Contact');
    }

    public function sendContactEmail(Request $request) {

        //Ezt lehet cserélni tesztelés miatt
        $email = 'info@appworld.hu';

        $data = $request->validate(
            [
            'name' => 'required|string|min:3|max:125',
            'email' => 'required|email',
            'phone' => 'nullable|max:30',
            'message' => 'required|string|min:5|max:255',
            'confirm' => 'accepted',
            ],
            [
            'name.required' => 'Név megadása kötelező!',
            'name.min' => 'A név minimum 3 karakterből kell, hogy álljon!',
            'name.max' => 'A név maximum 125 karakterből állhat!',

            'email.required' => 'Email megadása kötelező!',
            'email.email' => 'Nem valid email címet adtál meg!',
                
            'phone.max' => 'Túl hosszú a megadott telefonszám!',

            'message.required' => 'Üzenet megadása kötelező!',
            'message.min' => 'Az üzenetnek minimum 5 karakterből kell, hogy álljon!',
            'message.max' => 'Az üzenet nem lehett hosszabb mint 255 karakter!',

            'confirm.accepted' => 'Az üzenet elküldéséhez fogadd el az Általános Szerződési Feltételeket (ÁSZF)!',
            ]
        );

        //Email küldése (config-ban beállítva, .env szintén)
        Mail::to($email)->send(new ContactMail($data));
        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}
