--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-01-12 00:55:47 IST

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
-- TOC entry 285 (class 1259 OID 26275)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title character varying DEFAULT 'New conversation'::character varying NOT NULL,
    "userId" uuid NOT NULL,
    resolved boolean DEFAULT false NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;


--
-- TOC entry 2816 (class 2606 OID 26284)
-- Name: tickets tickets_duplicate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_duplicate_pkey PRIMARY KEY (id);


--
-- TOC entry 2817 (class 2606 OID 26290)
-- Name: tickets tickets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2962 (class 3256 OID 26296)
-- Name: tickets Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.tickets FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 2963 (class 3256 OID 26295)
-- Name: tickets Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.tickets FOR SELECT TO authenticated USING (true);


--
-- TOC entry 2964 (class 3256 OID 26315)
-- Name: tickets Enable update for users based on email; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on email" ON public.tickets FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 2961 (class 0 OID 26275)
-- Dependencies: 285
-- Name: tickets; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 285
-- Name: TABLE tickets; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tickets TO anon;
GRANT ALL ON TABLE public.tickets TO authenticated;
GRANT ALL ON TABLE public.tickets TO service_role;


-- Completed on 2023-01-12 00:55:50 IST

--
-- PostgreSQL database dump complete
--

