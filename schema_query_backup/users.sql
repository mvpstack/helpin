--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-01-12 00:56:35 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 265 (class 1259 OID 25933)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    email character varying,
    role character varying DEFAULT 'customer'::character varying NOT NULL,
    "ipInfo" jsonb,
    "idString" character varying NOT NULL,
    name character varying,
    "avatarColor" character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 265
-- Name: COLUMN users."avatarColor"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users."avatarColor" IS 'Unique color ';



--
-- TOC entry 2814 (class 2606 OID 25941)
-- Name: users users_duplicate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_duplicate_pkey PRIMARY KEY (id);


--
-- TOC entry 2816 (class 2606 OID 25961)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2818 (class 2606 OID 26034)
-- Name: users users_idString_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_idString_key" UNIQUE ("idString");


--
-- TOC entry 2963 (class 3256 OID 25943)
-- Name: users Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.users FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 2964 (class 3256 OID 25942)
-- Name: users Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT TO authenticated USING (true);


--
-- TOC entry 2962 (class 0 OID 25933)
-- Dependencies: 265
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 2973 (class 0 OID 0)
-- Dependencies: 265
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


-- Completed on 2023-01-12 00:56:39 IST

--
-- PostgreSQL database dump complete
--

