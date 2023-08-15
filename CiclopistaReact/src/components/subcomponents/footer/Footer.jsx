import React from 'react'
import './Footer.css'
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { AiFillMail } from "react-icons/ai";

export default function Footer() {
    return (
        <footer class="pie-pagina">
            <div class="grupo-1">
                <div class="box">
                    <figure>
                        <img src="https://drive.google.com/uc?export=download&id=1P75qBRzmXMvsn05sh-1Wu2iK5iX6_cp2" alt="Logo Ciclopista" />
                    </figure>
                </div>
                <div class="box">
                    <h2>Contactanos</h2>
                    <p><MdCall /> (+57) 312 5322455</p>
                    <p><AiFillMail />importacionesciclopista@gmail.com</p>
                </div>
                <div class="box">
                    <h2>Siguenos</h2>
                    <div class="red-social">
                        <a target='blank' href="https://wa.link/3hskoj"><FaWhatsapp className='fa fa-whatsapp' /></a>
                        <a target='blank' href="https://instagram.com/ciclopista?igshid=MzRlODBiNWFlZA=="><FaInstagram className='fa fa-instagram' /></a>
                        <a href="#"><FaTwitter className='fa fa-twitter' /></a>
                        <a target='blank' href="https://www.facebook.com/Ciclopista.repuestosyaccesorios?mibextid=ZbWKwL"><FaFacebook className='fa fa-facebook' /></a>
                        <a href="#"><FaTiktok className='fa fa-tiktok' /></a>
                    </div>
                </div>
            </div>
            <div class="grupo-2">
                <small>&copy; 2023 <b>Ciclopista</b></small>
            </div>
        </footer>
    )
}
