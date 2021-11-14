<?php
/**
 * controls database logic for profile controller
 */
class profile_model extends ci_model
{
    public function __construct()
    {
        $this->load->database();
    }

    /**
     * Retrieve user's current leaderboard ranking
     * @param int $userId
     * @return int leaderboard rank
     */
    public function getLeaderboardRank(int $userId){
        try {
            $bestScore = $this->getBestScore($userId);
            if ($bestScore == null) return null;

            $this->db->where('score <=', $bestScore);
            $this->db->from('leaderboard');

            return $this->db->count_all_results();
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * @param int $userId
     * @return array largest pco count user submitted in a game
     */
    public function getBestPCOCount(int $userId){
        try {
            $this->db->select_max('pco_count');
            $this->db->where('user_id', $userId);
            $query = $this->db->get('leaderboard');

            $result = $query->result_array();

            return $result[0]['pco_count'];
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * @param int $userId
     * @return array max score user submitted
     */
    public function getBestScore($userId){
        try {
            $this->db->select_max('score');
            $this->db->where('user_id', $userId);
            $query = $this->db->get('leaderboard');
            $result = $query->result_array();

            return $query->result_array()[0]['score'];
        } catch (PDOexception $e) {
            log_message('error', $e->errorInfo);
        }
    }
}