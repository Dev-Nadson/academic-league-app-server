import { Knex } from "knex";
import { create_id } from "../../utils/utils.js";
import { hash_text } from "../../utils/encryption.js";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex("users").insert([
        {
            id: create_id(),
            name: "usuario01",
            email: "usuario01@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "12345678",
            institution: "Unifavip",
            period: "2",
            role: "superadmin",
            avatar_url: "https://testeuau/",
            is_active: true
        },
        {
            id: create_id(),
            name: "usuario02",
            email: "usuario02@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "22345678",
            institution: "Unifavip",
            period: "2",
            role: "president",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario03",
            email: "usuario03@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "32345678",
            institution: "Unifavip",
            period: "2",
            role: "vice-president",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario04",
            email: "usuario04@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "42345678",
            institution: "Unifavip",
            period: "2",
            role: "director",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario05",
            email: "usuario05@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "52345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario06",
            email: "usuario06@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "62345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario07",
            email: "usuario07@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "72345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario09",
            email: "usuario09@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "92345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario10",
            email: "usuario10@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "102345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario11",
            email: "usuario11@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "112345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario12",
            email: "usuario12@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "122345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario13",
            email: "usuario13@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "132345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario14",
            email: "usuario14@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "142345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario15",
            email: "usuario15@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "152345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        }, {
            id: create_id(),
            name: "usuario16",
            email: "usuario16@gmail.com",
            password: await hash_text("12345678"),
            birthdate: "2025-10-09",
            enrollment_number: "162345678",
            institution: "Unifavip",
            period: "2",
            role: "member",
            avatar_url: "https://testeuau/",
            is_active: true
        },
    ]);
};
