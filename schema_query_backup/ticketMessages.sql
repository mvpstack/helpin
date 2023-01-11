--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-01-12 00:54:34 IST

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
-- TOC entry 284 (class 1259 OID 26243)
-- Name: ticketMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ticketMessages" (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    message character varying,
    type character varying DEFAULT 'text'::character varying,
    "userId" uuid NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "userType" character varying NOT NULL,
    "ticketId" bigint NOT NULL,
    "filePath" character varying
);


ALTER TABLE public."ticketMessages" OWNER TO postgres;

--
-- TOC entry 2974 (class 0 OID 0)
-- Dependencies: 284
-- Name: COLUMN "ticketMessages".type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."ticketMessages".type IS 'message type like is this text, image, or video.';


--
-- TOC entry 2975 (class 0 OID 0)
-- Dependencies: 284
-- Name: COLUMN "ticketMessages"."userType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."ticketMessages"."userType" IS 'is customer or support user';


--
-- TOC entry 2968 (class 0 OID 26243)
-- Dependencies: 284
-- Data for Name: ticketMessages; Type: TABLE DATA; Schema: public; Owner: postgres
--


--
-- TOC entry 2815 (class 2606 OID 26252)
-- Name: ticketMessages ticketMessages_duplicate_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ticketMessages"
    ADD CONSTRAINT "ticketMessages_duplicate_id_key" UNIQUE (id);


--
-- TOC entry 2817 (class 2606 OID 26254)
-- Name: ticketMessages ticketMessages_duplicate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ticketMessages"
    ADD CONSTRAINT "ticketMessages_duplicate_pkey" PRIMARY KEY (id);


--
-- TOC entry 2818 (class 2606 OID 26270)
-- Name: ticketMessages ticketMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ticketMessages"
    ADD CONSTRAINT "ticketMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2963 (class 3256 OID 26298)
-- Name: ticketMessages Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public."ticketMessages" FOR INSERT TO authenticated WITH CHECK (true);


--
-- TOC entry 2964 (class 3256 OID 26297)
-- Name: ticketMessages Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public."ticketMessages" FOR SELECT TO authenticated USING (true);


--
-- TOC entry 2965 (class 3256 OID 26299)
-- Name: ticketMessages Enable update for users based on email; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on email" ON public."ticketMessages" FOR UPDATE TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 2962 (class 0 OID 26243)
-- Dependencies: 284
-- Name: ticketMessages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."ticketMessages" ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 2976 (class 0 OID 0)
-- Dependencies: 284
-- Name: TABLE "ticketMessages"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ticketMessages" TO anon;
GRANT ALL ON TABLE public."ticketMessages" TO authenticated;
GRANT ALL ON TABLE public."ticketMessages" TO service_role;


-- Completed on 2023-01-12 00:54:39 IST

--
-- PostgreSQL database dump complete
--

