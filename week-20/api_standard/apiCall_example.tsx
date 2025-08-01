import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchEmailCounts } from "@src/apis/email";
import { EmailCountResponse } from "@src/interfaces";
import Loader from "@src/components/UI/Loader";
import Layout from "@src/components/admin/Layout";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [emailStats, setEmailStats] = useState<EmailCountResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.replace("/auth/login");
            return;
        }

        const loadEmailCounts = async () => {
            try {
                setLoading(true);
                const stats = await fetchEmailCounts();
                setEmailStats(stats);
            } catch (err) {
                console.error("Error fetching email counts:", err);
                setError("Failed to load email counts");
            } finally {
                setLoading(false);
            }
        };

        loadEmailCounts();
    }, [router]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-red-500">{error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex-1 p-6 bg-gray-100 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome to your email management dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href={"/admin/internal-emails"}>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Internal Messages</h3>
                                    <p className="text-3xl font-bold text-blue-600 mt-2">
                                        {emailStats?.internal_emails || 0}
                                    </p>
                                </div>
                                <svg className="w-12 h-12 text-blue-500 opacity-80">
                                    <use href="#icon-mail" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Total internal emails</p>
                        </div>
                    </Link>
                    <Link href={"/admin/external-emails"}>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">External Messages</h3>
                                    <p className="text-3xl font-bold text-green-600 mt-2">
                                        {emailStats?.external_emails || 0}
                                    </p>
                                </div>
                                <svg className="w-12 h-12 text-green-500 opacity-80">
                                    <use href="#icon-send" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">Total external emails</p>
                        </div>
                    </Link>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Total Messages</h3>
                                <p className="text-3xl font-bold text-purple-600 mt-2">
                                    {emailStats?.total_emails || 0}
                                </p>
                            </div>
                            <svg className="w-12 h-12 text-purple-500 opacity-80">
                                <use href="#icon-trending-up" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">All messages combined</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;